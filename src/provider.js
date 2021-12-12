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

      if (which.sync(this.getExec(), { nothrow: true })) {
        Logger.log('Build provider is eligible');
        return true;
      }

      Logger.error('Build provider isn\'t eligible');
      return false;
    }

    getExec() {
      const viteLocation = Config.get('viteLocation');
      return viteLocation === 'local' ? 'npx' : 'vite';
    } 

    settings() {
      const viteLocation = Config.get('viteLocation');
      const exec = this.getExec();

      return [
        {
          name: 'Vite: build',
          exec: exec,
          args: (viteLocation === 'local'
            ? ['vite', 'build', Config.get('customBuildArguments')]
            : ['build', Config.get('customBuildArguments')]
          ),
          cwd: '{PROJECT_PATH}',
          sh: false,
          atomCommandName: 'vite:build'
        },
        {
          name: 'Vite: optimize',
          exec: exec,
          args: (viteLocation === 'local'
            ? ['vite', 'optimize', Config.get('customOptimizeArguments')]
            : ['optimize', Config.get('customOptimizeArguments')]
          ),
          cwd: '{PROJECT_PATH}',
          sh: false,
          atomCommandName: 'vite:optimize'
        },
        {
          name: 'Vite: preview',
          exec: exec,
          args: (viteLocation === 'local'
            ? ['vite', 'preview', Config.get('customPreviewArguments')]
            : ['preview', Config.get('customOptimizeArguments')]
          ),
          cwd: '{PROJECT_PATH}',
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
