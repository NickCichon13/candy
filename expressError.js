
class ExpessError extends Error{
    constructo(message, status){
        super();
        this.message = message;
        this.status = status;
        console.error(this.stack);
    }
}

module.exports = ExpessError