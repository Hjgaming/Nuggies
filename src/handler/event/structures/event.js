class BaseEvent {
    constructor(name) {
        if(!name) throw new SyntaxError('Please provide a valid name.');
        if(typeof name !== 'string') throw new SyntaxError('Please provide a string as name.');
        if(name.length <= 1) throw new SyntaxError('Please provide a event with 1 or more characters.');

        this.name = name;
    }
}

module.exports = BaseEvent;