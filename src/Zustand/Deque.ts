export default class Deque<Type> {
    /// Attributes
    private container: (Type | null)[]
    private front: number
    private back: number
    private size: number
    private maxSize: number

    /// Methods
    public constructor(max: number) {
        this.container = []
        this.front = 0
        this.back = 0
        this.size = 0
        this.maxSize = max

        for (let i = 0; i < max; i++)
            this.container.push(null)
    }

    /// Get size
    public GetSize(): number {
        return this.size
    }

    /// Check empty
    public Empty(): boolean {
        return this.size == 0
    }

    /// Check if in deque
    public InDeque(value: Type): boolean {
        /// Empty deque
        if (this.Empty())
            return false 

        /// Non-empty deque
        let idx = this.front
        while (idx != this.back)
        {
            if (this.container[idx] == value)
                return true 
            else
                idx = (idx + 1) % this.maxSize
        }

        if (this.Back() == value)
            return true 
        return false
    }

    /// Get the front value
    public Front(): Type | null {
        if (this.Empty())
            throw "Empty Deque!"
        
        return this.container[this.front]
    }

    /// Get the back value
    public Back(): Type | null {
        if (this.Empty())
            throw "Empty Deque!"

        return this.container[this.back]
    }

    /// Push back
    public PushBack(value: Type): void {
        if (this.size >= this.maxSize)
            throw "Cannot add more! Maximum Capacity Given!"
        
        this.container[this.back] = value
        this.back = (this.back + 1) % this.maxSize
        this.size++
    }

    /// Pop back
    public PopBack(): void {
        if (this.size == 0)
            throw "Empty Deque!"
        
        this.back--
        if (this.back < 0)
            this.back += this.maxSize
        this.size--
    }

    /// Push front
    public PushFront(value: Type): void {
        if (this.size >= this.maxSize)
            throw "Cannot add more! Maximum Capacity Given!"
        
        this.front--
        if (this.front < 0)
            this.front += this.maxSize
        this.container[this.front] = value
        this.size++
    }

    /// Pop front
    public PopFront(): void {
        if (this.size == 0)
            throw "Empty Deque!"

        this.front = (this.front + 1) % this.maxSize
        this.size--
    }

    /// Clear
    public Clear(): void {
        this.container = []
        for (let i = 0; i < this.maxSize; i++)
            this.container.push(null)
        this.front = 0
        this.back = 0
        this.size = 0
    }
}