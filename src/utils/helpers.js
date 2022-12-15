export const enqueue = (currentQueue, setFunction, newQueueItem) => {
    setFunction([...currentQueue, newQueueItem])    // calls setFunction — includes current queue and new item
}

export const dequeue = (currentQueue, setFunction) => {
    setFunction([...currentQueue.slice(1)])  // removes first item from current queue
}

export const removeFromQueue = (currentQueue, setFunction, index) => {
    setFunction([...currentQueue.slice(0, index), ...currentQueue.slice(index + 1)])  // copies up to and after index — removes item at index
}

export const encodeJsonUrl = (json) => {
    return encodeURIComponent(JSON.stringify(json))
}

export const decodeJsonUrl = (url) => {
    return JSON.parse(decodeURIComponent(url))
}

export const updateQueueItem = (currentQueue, setFunction, newQueueItem, index) => {
    setFunction([...currentQueue.slice(0, index), newQueueItem, ...currentQueue.slice(index + 1)])
}

export const calculateTotalTime = (queue) => {
    return queue.reduce((total, timer) => {
        return total + timer.totalTime 
      }, 0)
}

export const formattedTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes} : ${seconds}`;
}