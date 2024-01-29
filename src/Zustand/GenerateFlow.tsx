import Deque from "./Deque"
import courses from "./data"


export type course = {
    name: string,
    prereq: any[]
}

export type ranDict = {
    [key: string]: course
}

export type AdjList = {
    [key: string]: string[]
}

export const random: ranDict = {
    'MTH132': {
        name: 'MTH132',
        prereq: [],
    },
    'MTH133': {
        name: 'MTH133',
        prereq: ['MTH132'],
    },
    'MTH234': {
        name: 'MTH234',
        prereq: ['MTH133']
    },
    'STT351': {
        name: 'STT351',
        prereq: ['MTH234'],
    },
    'CSE231': {
        name: 'CSE231',
        prereq: [],
    },
    'CSE232': {
        name: 'CSE232',
        prereq: ['CSE231', 'MTH132'],
    },
    'CSE260': {
        name: 'CSE260',
        prereq: ['MTH133'],
    },
    'CSE300': {
        name: 'CSE300',
        prereq: ['CSE232'],
    }
    ,
    'CSE320': {
        name: 'CSE320',
        prereq: ['CSE232', 'CSE260'],
    },
    'CSE325': {
        name: 'CSE325',
        prereq: ['CSE320'],
    },
    'CSE331': {
        name: 'CSE331',
        prereq: ['CSE232', 'CSE260'],
    },
    'CSE335': {
        name: 'CSE335',
        prereq: ['CSE232', 'CSE260'],        
    },
    'CSE404': {
        name: 'CSE404',
        prereq: ['CSE331', 'MTH314', 'STT351'],
    },
    'CSE410': {
        name: 'CSE410',
        prereq: ['CSE232', 'CSE260', 'CSE325'],
    },
    'CSE422': {
        name: 'CSE422',
        prereq: ['STT351', 'CSE325'],
    },
    'CSE425': {
        name: 'CSE425',
        prereq: ['CSE325'],
    },
    'CSE431': {
        name: 'CSE431',
        prereq: ['CSE331'],
    },
    'CSE440': {
        name: 'CSE440',
        prereq: ['CSE331', 'MTH314'],
    },
    'CSE472': {
        name: 'CSE472',
        prereq: ['CSE331', 'MTH314'],
    },
    'CSE476': {
        name: 'CSE476',
        prereq: [['CSE320'], ['CSE331'], ['CSE335']],
    },
    'CSE477': {
        name: 'CSE477',
        prereq: [['CSE320'], ['CSE331'], ['CSE335']],
    },
    'CSE480': {
        name: 'CSE480',
        prereq: [['CSE331'], ['CSE335']],
    },
    'CSE482': {
        name: 'CSE482',
        prereq: ['CSE331', 'STT351', 'MTH314', 'MTH234'],
    },
}

/// data in dictionary form
const CoursesDict = (): ranDict => {
    let coursesDict: ranDict = {}

    const mapToDict = (item: course) => {

        coursesDict[item.name] = {name: item.name, prereq: item.prereq}
    }

    courses.forEach(mapToDict)

    return coursesDict
}

export const coursesDict: ranDict = CoursesDict()

export const GenerateFlow = (course: string): String[] => {
    let flow: String[] = []
    // let prerequisites: String[][] = []
    let inDegree: any = {}
    let adj: AdjList = {}
    let deque = new Deque(1000)

    const GetInDegree = (courseName: string): void => {   
        /// details of current course with course name
        const details = coursesDict[courseName]
        const cntPrereq = details.prereq.length

        /// Have prereq
        inDegree[courseName] = cntPrereq
        if (cntPrereq == 0)
        {
            if (!deque.InDeque(courseName))
                deque.PushBack(courseName)
            return            
        }

        details.prereq.forEach((pre: string) => {
            if (!adj.hasOwnProperty(pre))
            {
                adj[pre] = [courseName]
            }
            else 
                adj[pre].push(courseName)
        })
        
        details.prereq.forEach(GetInDegree)
    }

    GetInDegree(course)
    console.log(inDegree)
    console.log(deque)
    console.log("adj\n", adj)

    /// Topological Sort
    let cur: any
    while (!deque.Empty())
    {
        cur = deque.Front()
        deque.PopFront()

        flow.push(cur)

        /// if cur not in adj => return undefined
        if (adj[cur])
        {
            adj[cur].forEach((c: string) => {
                inDegree[c]--
                if (inDegree[c] == 0)
                    deque.PushBack(c)
            })
        }
    }

    console.log("Courseflow would be\n", flow)
    return flow
} 