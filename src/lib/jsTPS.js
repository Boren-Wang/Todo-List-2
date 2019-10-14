class jsTPS {
    constructor() {
        this.transactions = []
        this.mostRecentTransaction = -1
        this.performingDo = false
        this.performingUndo = false
    }

    isPerformingDo = function() {
        return this.performingDo
    }

    isPerformingUnDo = function() {
        return this.performingUndo
    }

    addTransaction = function(transaction) {
        // ARE THERE OLD UNDONE TRANSACTIONS ON THE STACK THAT FIRST
        // NEED TO BE CLEARED OUT, i.e. ARE WE BRANCHING?
        if ((this.mostRecentTransaction < 0)|| (this.mostRecentTransaction < (this.transactions.length-1))) {
            for (let i = this.transactions.length-1; i > this.mostRecentTransaction; i--) {
                this.transactions.splice(i, 1);
            }
        }

        // AND NOW ADD THE TRANSACTION
        this.transactions.push(transaction);

        // AND EXECUTE IT
        this.doTransaction();        
    }

    doTransaction = function() {
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            let transaction = this.transactions[this.mostRecentTransaction+1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }

    peekUndo = function() {
        if (this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction];
        }
        else
            return null;
    }

    peekDo = function() {
        if (this.hasTransactionToRedo()) {
            return this.transactions[this.mostRecentTransaction+1];
        }
        else
            return null;
    }

    undoTransaction = function() {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            let transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }

    clearAllTransactions = function() {
        // REMOVE ALL THE TRANSACTIONS
        this.transactions = [];
        
        // MAKE SURE TO RESET THE LOCATION OF THE
        // TOP OF THE TPS STACK TOO
        this.mostRecentTransaction = -1;        
    }

    getSize() {
        return this.transactions.length;
    }

    getRedoSize() {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    getUndoSize() {
        return this.mostRecentTransaction + 1;
    }

    hasTransactionToUndo() {
        return this.mostRecentTransaction >= 0;
    }

    hasTransactionToRedo() {
        return this.mostRecentTransaction < (this.transactions.length-1);
    }

    getSummary() {
        let summary = ('--Number of Transactions: '+this.transactions.length+"\n"+
        "--Current Index on Stack: " + this.mostRecentTransaction+"\n"+
        "--Current Transaction Stack:\n")
        for(let i=0; i<=this.mostRecentTransaction; i++){
            let transaction = this.transactions[i]
            summary+="----"+transaction.getSummary()+"\n"
        }
        return summary
    }
} 

class jsTPS_Transaction {
    doTransaction() {

    }

    undoTransaction() {

    }
}

export {
    jsTPS,
    jsTPS_Transaction
}
