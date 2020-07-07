module.exports = 
class Queue
{
    constructor(maxSize)
    {
        if (isNaN(maxSize))
        {
            maxSize = 10;
        }
        this.maxSize = maxSize;
        this.container = [];
    }
    
    isEmpty() { return this.container.Length === 0;}
    isFull() { return this.container.Length >= this.maxSize;}

    enqueue(element)
    {
        if (this.isFull())
        {
            console.log('Queue overflow.'); 
            return;
        }
        this.container.push(element);
    }
    
    dequeue()
    {
        if (this.isEmpty())
        {
            console.log('Queue is empty.');
            return;
        }
        return this.container.shift();
    }

    peek()
    {
        if (this.isEmpty())
        {
            console.log('Queue is empty.');
            return;
        }
        return this.container[0];
    }

    list()
    {
        const songs = this.container;
        return songs;
    }

    clear()
    {
        this.container = [];
    }
};