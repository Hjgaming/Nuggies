class RequirementsOptions {
	constructor({
		clientPermissions = ['SEND_MESSAGES', 'EMBED_LINKS'],
		memberPermissions = [],
	}) {
		this.clientPermissions = clientPermissions;
		this.memberPermissions = memberPermissions;
	}
}
module.exports = RequirementsOptions;