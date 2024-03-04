interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    clear: () => void;
  }
  
  export class Stack<T> implements IStack<T> {
    container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item)
    };
  
    pop = (): void => {
      this.container.pop();
    };
  
    peak = (): T | null => {
      if(this.container.length == 0) {
        return null;
      }
      return this.container[this.container.length - 1]; 
    };
  
    clear = () => {
        this.container = [];
    }
  }