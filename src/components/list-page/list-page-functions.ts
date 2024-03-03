export class Node<T> {
    value: T
    next: Node<T> | null

    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }

  interface ILinkedList<T> {
    prepend: (value: T) => void;
    append: (value: T) => void;
    removeHead: () => T | null;
    removeTail: () => T | null;
    addAtIndex: (index: number, value: T) => void;
    removeAtIndex: (index: number) => void;
    getList: () => void;
    toArray: () => T[];
  }

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private length: number = 0;

  prepend = (value: T) => {
    const newNode = new Node(value);

    if(!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  append = (value: T) => {
    const newNode = new Node(value);

    if(!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  removeHead = () => {
    if(!this.head) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if(!this.head) {
      this.tail = null;
    }
    this.length--;
    return value;
  }

  removeTail = () => {
    if(!this.tail) {
      return null;
    }

    if(this.head === this.tail) {
      const value = this.head.value;
      this.head = this.tail = null;
      this.length--;
      return value;
    }

    let cur = this.head!;
    while(cur.next !== this.tail) {
      cur = cur.next!;
    }

    const value = this.tail.value;
    this.tail = cur;
    this.tail.next = null;
    this.length--;
    return value;
  }

  addAtIndex = (index: number, value: T) => {
    if(index > this.length || index < 0) {
      console.error('Index isnt right');
      return;
    }
    if(index === 0) {
      this.prepend(value);
      return;
    }

    if(index === this.length) {
      this.append(value);
      return;
    }

    const newNode = new Node(value);
    let cur = this.head;
    for(let i = 0; i < index - 1; i++) {
      cur = cur!.next;
    }

    newNode.next = cur!.next;
    cur!.next = newNode;
    this.length++;
  }

  removeAtIndex = (index: number) => {
    if(index >= this.length || index < 0) {
      console.error('Index isnt right');
      return;
    }
    if(index === 0) {
      this.removeHead();
      return;
    }

    let cur = this.head;
    for(let i = 0; i < index - 1; i++) {
      cur = cur!.next;
    }

    const value = cur!.next!.value;
    cur!.next = cur!.next!.next;

    if(index === this.length - 1) {
      this.tail = cur;
    }

    this.length--;
    return value;
  }

  getList = () => {
    let cur = this.head;
    console.log('Current list: ')
    while(cur !== null) {
      console.log(cur.value);
      cur = cur.next;
    }
  }

  toArray = () => {
    const array: T[] = [];
    let cur = this.head;
    while(cur !== null) {
      array.push(cur.value);
      cur = cur.next;
    }

    return array;
  }
}