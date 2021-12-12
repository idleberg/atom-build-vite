import Config from './config';
import { EventEmitter } from 'events';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Logger from './log';
import { name } from '../package.json';
import which from 'which';

const schema = Config.schema;
export { schema as config };

export function provideBuilder() {
  return class ViteProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-vite.customBuildArguments', () => this.emit('refresh'));
      atom.config.observe('build-vite.customPreviewArguments', () => this.emit('refresh'));
      atom.config.observe('build-vite.customOptimizeArguments', () => this.emit('refresh'));
      atom.config.observe('build-vite.alwayEligible', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'Vite';
    }

    isEligible() {
      if (Config.get('alwaysEligible') === true) {
        Logger.log('Always eligible');
        return true;
      }

      if (which.sync('vite', { nothrow: true })) {
        Logger.log('Build provider is eligible');
        return true;
      }

      Logger.error('Build provider isn\'t eligible');
      return false;
    }

    settings() {
      return [
        {
          name: 'Vite: build',
          exec: 'vite',
          args: [
            'build',
            ...Config.get('customBuildArguments'),
            '{FILE_ACTIVE}'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'vite:build'
        },
        {
          name: 'Vite: optimize',
          exec: 'vite',
          args: [
            'optimize',
            ...Config.get('customOptimizeArguments'),
            '{FILE_ACTIVE}'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'vite:optimize'
        },
        {
          name: 'Vite: preview',
          exec: 'vite',
          args: [
            'preview',
            ...Config.get('customPreviewArguments'),
            '{FILE_ACTIVE}'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'vite:preview'
        }
      ];
    }
  };
}

export function activate() {
  Logger.log('Activating package');

  // This package depends on preview, make sure it's installed
  if (Config.get('manageDependencies') === true) {
    satisfyDependencies(name);
  }
}

export function deactivate() {
  Logger.log('Deactivating package');
}
