# build-vite

[![apm](https://flat.badgen.net/apm/license/build-vite)](https://atom.io/packages/build-vite)
[![apm](https://flat.badgen.net/apm/v/build-vite)](https://atom.io/packages/build-vite)
[![apm](https://flat.badgen.net/apm/dl/build-vite)](https://atom.io/packages/build-vite)
[![CI](https://img.shields.io/github/workflow/status/idleberg/atom-build-vite/CI?style=flat-square)](https://github.com/idleberg/atom-build-vite/actions)
[![David](https://flat.badgen.net/david/dev/idleberg/atom-build-vite)](https://david-dm.org/idleberg/atom-build-vite?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `vite`, the next generation frontend tooling for the Web.

## Installation

### apm

Install `build-vite` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-vite`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone repository as `build-vite`:

```bash
$ git clone https://github.com/idleberg/atom-build-vite build-vite
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

You should now be setup to build the package:

```bash
$ yarn build || npm run build
```

## Usage

### Prerequisites

Make sure [Vite](https://vitejs.dev/) is installed properly and that `vite` is in your PATH [environmental variable](http://superuser.com/a/284351/195953).

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

- Vite: build
- Vite: optimize
- Vite: preview

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE).
