import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  }
})

const format = `
from time import  sleep
from threading import *

class Hello(Thread):
    def run(self):
        for i in range(500):
            print("Hello")
            sleep(1)

class Hi(Thread):
    def run(self):
        for i in range(500):
            print("Hi")
            sleep(1)

t1=Hello()
t2=Hi()

t1.start()
sleep(0.2)
t2.start()

t1.join()
t2.join()

print('By')
`.trim();

const database = `
from threading import Thread
import time

database_value = 0

def increase():
    global database_value                                           # needed to modify the global value
    
    local_copy = database_value                                     # get a local copy (simulate data retrieving)
        
    local_copy += 1                                                 # simulate some modifying operation
    time.sleep(0.1)
        
    database_value = local_copy                                     # write the calculated new value into the global variable


if __name__ == "__main__":

    print('Start value: ', database_value)

    t1 = Thread(target=increase)
    t2 = Thread(target=increase)

    t1.start()
    t2.start()

    t1.join()
    t2.join()

    print('End value:', database_value)

    print('end main')`.trim();

const waiting = `
from queue import Queue

q = Queue()                                                               # create queue

q.put(1)                                                                  
q.put(2)                                                                
q.put(3)                                                                  

first = q.get()                                                           
print(first)                                                              
`.trim();

const exchange = `
from threading import Thread, Lock, current_thread
from queue import Queue

def worker(q, lock):
    while True:
        value = q.get()                                                         # blocks until the item is available

        # do stuff...
        with lock:
            print(f"in {current_thread().name} got {value}")            # prevent printing at the same time with this lock  

        q.task_done()


if __name__ == '__main__':
    q = Queue()
    num_threads = 10
    lock = Lock()

    for i in range(num_threads):
        t = Thread(name=f"Thread{i+1}", target=worker, args=(q, lock))
        t.daemon = True                                                           # dies when the main thread dies
        t.start()
    
    for x in range(20):                                                           # fill the queue with items
        q.put(x)

    q.join()                                      # Blocks until all items in the queue have been gotten and processed.
    print('main done')`.trim();

const continues = `
from multiprocessing import Process
import os

def square_numbers():
    for i in range(1000):
        result = i * i

        
if __name__ == "__main__":        
    processes = []
    num_processes = os.cpu_count()                                            # number of CPUs on the machine.
     
    for i in range(num_processes):                                  # create processes and asign a function for each process
        process = Process(target=square_numbers)
        processes.append(process)

    for process in processes:                                                 # start all processes
        process.start()
                                                          # wait for all processes to finish
                                                          # block the main programm until these processes are finished
    for process in processes:
        process.join()`.trim();

const processes = `
from multiprocessing import Process, Value, Array
import time

def add_100(number):
    for _ in range(100):
        time.sleep(0.01)
        number.value += 1

def add_100_array(numbers):
    for _ in range(100):
        time.sleep(0.01)
        for i in range(len(numbers)):
            numbers[i] += 1


if __name__ == "__main__":

    shared_number = Value('i', 0) 
    print('Value at beginning:', shared_number.value)

    shared_array = Array('d', [0.0, 100.0, 200.0])
    print('Array at beginning:', shared_array[:])

    process1 = Process(target=add_100, args=(shared_number,))
    process2 = Process(target=add_100, args=(shared_number,))

    process3 = Process(target=add_100_array, args=(shared_array,))
    process4 = Process(target=add_100_array, args=(shared_array,))

    process1.start()
    process2.start()
    process3.start()
    process4.start()

    process1.join()
    process2.join()
    process3.join()
    process4.join()

    print('Value at end:', shared_number.value)
    print('Array at end:', shared_array[:])

    print('end main')`.trim();

const contexts = `
def add_100(number, lock):
    for _ in range(100):
        time.sleep(0.01)
        with lock:
            number.value += 1`.trim();

const asynchronous = `
from multiprocessing import Pool 

def cube(number):
    return number * number * number
    
if __name__ == "__main__":
    numbers = range(10)
    p = Pool()                                          # by default this allocates the maximum number of available 
                                                        # processors for this task --> os.cpu_count().
    result = p.map(cube,  numbers)
    
    p.close()                                           
    p.join()                                                            
    print(result)                                       # result = [p.apply(cube, args=(i,)) for i in numbers].
    `.trim();


class Threadings extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4><Sidebar /></h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>Threading vs Multiprocessing</h3>
              We have two common approaches to run code in parallel (achieve multitasking)
              <ul>
                <li>threads</li>
                <li>multiple processes</li>
              </ul>
              <br />

              <h3>Process</h3>
              A Process is an instance of a program. They are independent from each other and do not share the same memory.
              <br />
              <br />
              <b>Key facts:</b>
              <ul>
                <li>A new process is started independently from the first process.</li>
                <li>Takes advantage of multiple CPUs and cores.</li>
                <li>Separate memory space.</li>
                <li>Memory is not shared between processes.</li>
                <li>One GIL (Global interpreter lock) for each process, i.e. avoids GIL limitation.</li>
                <li>Great for CPU-bound processing.</li>
                <li>Child processes are interruptable/ killable.</li>
                <li>Starting a process is slower than starting a thread.</li>
                <li>Larger memory footprint.</li>
                <li>IPC (inter-process communication) is more complicated.</li>
              </ul>
              <br />

              <h3>Threads</h3>
              A thread is an entity within a process that can be scheduled for execution. A Process can spawn
              multiple threads. The main difference is that all threads within a process share the same memory.
              <br />
              <br />
              <b>Key facts:</b>
              <br />
              <ul>
                <li>Multiple threads can be spawned within one process.</li>
                <li>Memory is shared between all threads.</li>
                <li>Starting a thread is faster than starting a process.</li>
                <li>Great for I/O-bound tasks.</li>
                <li>Leightweight - low memory footprint.</li>
                <li>One GIL for all threads, i.e. threads are limited by GIL.</li>
                <li>Multithreading has no effect for CPU-bound tasks due to the GIL.</li>
                <li>Not interruptible/ killable - be careful with memory leaks.</li>
                <li>increased potential for race conditions.</li>
              </ul>
              <br />

              <h3>Threading in Python</h3>
              Use the threading module.
              <br />
              Note: The following example usually won't benefit from multiple threads since it is CPU-bound. It should just show the example of how to use threads.
              <div style={titles}>
                <PrismCode
                  code={format}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>When is Threading useful</h3>
              <ul>
                <li>Useful for I/O-bound tasks when program has to talk to slow devices like a hard drive or a network connection.</li>
                <li>With threading the program can use the time waiting for these devices and do other tasks in the meantime.</li>
              </ul>
              <br />

              <h3>Multiprocessing</h3>
              Create a process with <b>multiprocessing.Process()</b>. It takes two important arguments:
              <br />
              <ul>
                <li><b>target:</b> a callable object (function) for this process to be invoked when the process starts</li>
                <li><b>args:</b> the (function) arguments for the target function. This must be a tuple</li>
              </ul>
              <br />
              <ul>
                <li>Start a process with process.start().</li>
                <li>Call process.join() to tell the program that it should wait for this process to complete before it continues with the rest of the code.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={continues}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>When is Multiprocessing useful</h3>
              It is useful for CPU-bound tasks that have to do a lot of CPU operations for a large amount of data and require a lot of computation
              time. With multiprocessing we can split the data into equal parts and do parallel computing on different CPUs.
              <br />
              <br />
              <b>Ex. </b> Calculate the square numbers for all numbers from 1 to 1000000. Divide the numbers into equal sized parts and use a process for each subset.
              <br />

              <h3>GIL - Global interpreter lock</h3>
              This is a mutex (or a lock) that allows only one thread to hold control of the Python interpreter. This means that the GIL allows only one thread to execute at a time even in a multi-threaded architecture.

              <h3>Why is it needed?</h3>
              It is needed because CPython's memory management is not thread-safe. Python uses reference counting for memory management. It means
              that objects created in Python have a reference count variable that keeps track of the number of references that point to the object.
              When this count reaches zero, the memory occupied by the object is released. The problem was that this reference count variable needed protection
              from race conditions where two threads increase/ decrease its value simultaneously. If this happens, it can cause either leaked memory that
              is never released or incorrectly release the memory while a reference to that object still exists.
              <br />

              <h3>How to avoid the GIL</h3>
              <ul>
                <li>Avoid GIL by using multiprocessing instead of threading. </li>
                <li>Avoid the CPython implementation and use a free-threaded Python implementation like Jython or IronPython.</li>
                <li>Move parts of the application out into binary extensions modules, i.e. use Python as a wrapper for
                  third party libraries (e.g. in C/C++). This is the path taken by numypy and scipy.</li>
              </ul>
              <br />

              <h3>Share data between threads</h3>
              Task: Create two threads, each thread should access the current database value, modify it, and write
              the new value back into the database value. Each thread should do this operation 10 times.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={database}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Share data between processes</h3>
              Since processes don't live in the same memory space, they do not have access to the same (public) data. Thus, they need special shared memory objects to share data.
              <br />
              <br />
              Data can be stored in a shared memory variable using Value or Array.
              <br />
              <ul>
                <li><b>Value(type, value):</b> Create a ctypes object of type type. Access the value with .target.</li>
                <li><b>Array(type, value):</b> Create a ctypes array with elements of type type. Access the values with [].</li>
              </ul>
              <br />
              Task: Create two processes, each process should have access to a shared variable and modify it (Only
              increase it repeatedly by 1 for 100 times). Create another two processes that share an array and modify
              all the elements in the array.
              <div style={titles}>
                <PrismCode
                  code={processes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>How to use Locks</h3>
              In the above example (Share data between threads), the 2 threads should increment the value by 1, so 2 increment operations are performed.
              But why is the end value 1 and not 2?
              <br />
              <br />
              <b>Race condition: </b>
              <br />
              A race condition happened here. A race condition occurs when two/ more threads can access shared data and they try to change it at the same
              time. Because the thread scheduling algorithm can swap between threads at any time, we don't know the order in which the threads will
              attempt to access the shared data. In our case, the first thread accesses the database_value (0) and stores it in a local copy. It then
              increments it (local_copy is now 1). With our time.sleep() function that just simulates some time consuming operations, the programm will swap
              to the second thread in the meantime. This will also retrieve the current database_value (still 0) and increment the local_copy to 1. Now
              both threads have a local copy with value 1, so both will write the 1 into the global database_value. This is why the end value is 1 and not 2.
              <br />
              <br />
              <b>Avoid race conditions with Locks</b>
              <br />
              A lock (mutex) is a synchronization mechanism for enforcing limits on access to a resource in an environment where there are many
              threads of execution.
              <br />
              <b>A Lock has two states: </b>
              <ul>
                <li>Locked</li>
                <li>Unlocked</li>
              </ul>
              If the state is locked, it does not allow other concurrent threads to enter this code section until the state is unlocked again.
              <br />
              <br />
              Two functions are important:
              <ul>
                <li><b>lock.acquire():</b> This will lock the state and block</li>
                <li><b>lock.release():</b> This will unlock the state again.</li>
              </ul>
              <br />
              <b>N:</b> We should always release the block again after it was acquired!.
              <br />

              <h3>Using Queues in Python</h3>
              Queues can be used for thread-safe/ process-safe data exchanges and data processing both in a multithreaded and a multiprocessing environment.
              <br />
              <br />
              <b>The queue</b>
              <br />
              A queue is a linear data structure that follows the FIFO principle.
              <div style={titles}>
                <PrismCode
                  code={waiting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Using a queue in multithreading</h3>
              Operations with a queue are thread-safe.
              <br />
              <ul>
                <li><b>q.get():</b> Remove and return the first item. By default, it blocks until the item is available.</li>
                <li><b>q.put(item):</b> Puts element at the end of the queue. By default, it blocks until a free slot is available.</li>
                <li><b>q.task_done():</b> Indicate that a formerly enqueued task is complete. For each get() we should call this after we are
                  done with our task for this item.</li>
                <br />
                <li><b>q.join():</b> Blocks until all items in the queue have been gotten and proccessed (task_done() has been called for each item).</li>
                <li><b>q.empty():</b> Return True if the queue is empty.</li>
              </ul>
              <br />
              The following example uses a queue to exchange numbers from 0...19. Each thread invokes the worker
              method. Inside the infinite loop the thread is waiting until items are available due to the blocking
              q.get() call. When items are available, they are processed and then q.task_done() tells the queue that
              processing is complete.
              <br />

              In the main thread, 10 daemon threads are created. This means that they automatically
              die when the main thread dies, and thus the worker method and infinite loop is no longer invoked. Then the queue
              is filled with items and the worker method can continue with available items.
              <br />

              At the end q.join() is necessary to block the main thread until all items have been gotten and proccessed.
              <br />
              <br />
              <i>If all tasks are done, q.join() can unblock</i>
              <div style={titles}>
                <PrismCode
                  code={exchange}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Daemon threads</h3>
              Daemon threads are background threads that automatically
              die when the main program ends. This is why the infinite loops inside the worker methods can be exited.
              Without a daemon process we would have to use a signalling mechanism such as a threading.Event to stop
              the worker.
              <br />
              Daemon thread abruptly stopped and their resources
              (e.g. open files or database transactions) may not be released/ completed properly.
              <br />
              <br />

              <h3>Use the lock as a context manager</h3>
              After <b>lock.acquire()</b> we should never forget to call <b>lock.release()</b> to unblock the code. We can also use a lock as a context manager,
              wich will safely lock and unlock our code. It is recommended to use a lock this way:
              <div style={titles}>
                <PrismCode
                  code={contexts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Process Pools</h3>
              A process pool object controls a pool of worker processes to which jobs can be submitted It supports
              asynchronous results with timeouts and callbacks and has a parallel map implementation. It can
              automatically manage the available processors and split data into smaller chunks which can then be
              processed in parallel by different processes.
              <br />
              <br />
              <ul>
                <li><b>map(func, iterable[, chunksize]):</b> This method chops the iterable into a number of chunks
                  which it submits to the process pool as separate tasks. The size of these chunks can be specified by
                  setting chunk size to a positive integer. It blocks until the result is ready.</li>
                <li><b>close():</b> Prevents any more tasks from being submitted to the pool. Once all the tasks have
                  been completed the worker processes will exit.</li>
                <li><b>join():</b> Wait for the worker processes to exit. One must call close() or terminate() before
                  using join().</li>
                <li><b>apply(func, args):</b> Call func with arguments args. It blocks until the result is ready. func
                  is only executed in ONE of the workers of the pool.</li>
              </ul>
              <br />
              <b>Note: </b>There are also asynchronous variants map_async() and apply_async() that will not block. They can
              execute callbacks when the results are ready.
              <div style={titles}>
                <PrismCode
                  code={asynchronous}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Threadings));
