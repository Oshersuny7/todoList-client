export default () => {
    self.addEventListener('message', (event) => {
      console.log("Received message in alertWorker:", event.data);
      const { notificationTime, text, taskId,status } = event.data;
  
      setTimeout(() => {
        self.postMessage({ text, taskId,status }); 
      }, notificationTime);
    });
  };
  
  