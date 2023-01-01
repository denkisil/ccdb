class NotExistsFileByPath extends Error {
	constructor (path) {
		super (`Caanot read non-exists file by goted path: ${path}`);

		this.name = "NotExistsFileByPath"
	}
}

export {
	NotExistsFileByPath
}