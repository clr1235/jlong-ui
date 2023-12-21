import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import { projRoot } from './paths'

import type { ProjectManifest } from '@pnpm/types'

export const getWorkspacePackages = () => findWorkspacePackages(projRoot)
export const getWorkspaceNames = async (dir = projRoot) => {
	const pkgs = await findWorkspacePackages(projRoot)
	return pkgs
		.filter((pkg) => pkg.dir.startsWith(dir))
		.map((pkg) => pkg.manifest.name)
		.filter((name): name is string => !!name)
}

export const getPackageManifest = (pkgPath: string) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies = (pkgPath: string): Record<'dependencies' | 'peerDependencies', string[]> => {
	const manifest = getPackageManifest(pkgPath)
	const { dependencies = {}, peerDependencies = {} } = manifest
	return {
		dependencies: Object.keys(dependencies),
		peerDependencies: Object.keys(peerDependencies),
	}
}

export const excludeFiles = (files: string[]) => {
	const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
	return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}

import { PKG_NAME, PKG_PREFIX } from './constants'
import { buildConfig } from '../build-info'

import type { Module } from '../build-info'

/** used for type generator */
export const pathRewriter = (module: Module) => {
	const config = buildConfig[module]

	return (id: string) => {
		/**
		 * Property 'replaceAll' does not exist on type 'string'. Do you need to change your target library?
		 * Try changing the 'lib' compiler option to 'es2021' or later.ts(2550)
		 *
		 * fix: ES2021.String
		 */
		id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`)
		id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path}/`)
		return id
	}
}
