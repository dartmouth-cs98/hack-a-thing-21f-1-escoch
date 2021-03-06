export default class JsonOutput {
	constructor(options) {
		this.options = options;
		this.values = [];
	}

	get asObject() {
		return this.values.map(values => {
			return values.reduce((acc, value, index) => {
				acc[this.options.head[index]] = value;
				return acc;
			}, {});
		});
	}

	push(value) {
		this.values.push(value);
	}

	toString() {
		return JSON.stringify(this.asObject);
	}
}
