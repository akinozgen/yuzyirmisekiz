export default {
  
  queue: [],
  continueOnError: false,
  currentIndex: 0,

  startQueue(index = 0) {
    if (typeof this.queue[index] === 'undefined') return setTimeout(() => {
      this.startQueue(index);
    }, 1000);

    const task = this.queue[index];
    if (typeof task['parameters'] === 'undefined') task.parameters = {};
    
    const worker = task.worker({ ...task.parameters });
    
    worker
      .then(_result => {
        this.currentIndex = index + 1;
        delete this.queue[index];
        this.startQueue(this.currentIndex);
      });

    if (this.continueOnError) {
      worker.catch(_error => {
        this.currentIndex = index + 1;
        delete this.queue[index];
        this.startQueue(this.currentIndex);
      });
    }
  },
  
  enqueue (worker, parameters) {
    this.queue.push({
      worker,
      parameters
    });
  },

  onFinish(cb) {
    cb();
  }

};