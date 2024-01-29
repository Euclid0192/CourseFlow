const courses = [
    {
        "name": 'MTH132',
        "prereq": [],
    },
    {
        "name": 'MTH133',
        "prereq": ['MTH132'],
    },
    {
        "name": 'MTH234',
        "prereq": ['MTH133']
    },
    {
        "name": 'STT351',
        "prereq": ['MTH234'],
    },
    {
        "name": 'CSE231',
        "prereq": [],
    },
    {
        "name": 'CSE232',
        "prereq": ['CSE231', 'MTH132'],
    },
    {
        "name": 'CSE260',
        "prereq": ['MTH133'],
    },
    {
        "name": 'CSE300',
        "prereq": ['CSE232'],
    }
    ,
    {
        "name": 'CSE320',
        "prereq": ['CSE232', 'CSE260'],
    },
    {
        "name": 'CSE325',
        "prereq": ['CSE320'],
    },
    {
        "name": 'CSE331',
        "prereq": ['CSE232', 'CSE260'],
    },
    {
        "name": 'CSE335',
        "prereq": ['CSE232', 'CSE260'],        
    },
    {
        "name": 'CSE404',
        "prereq": ['CSE331', 'MTH314', 'STT351'],
    },
    {
        "name": 'CSE410',
        "prereq": ['CSE232', 'CSE260', 'CSE325'],
    },
    {
        "name": 'CSE422',
        "prereq": ['STT351', 'CSE325'],
    },
    {
        "name": 'CSE425',
        "prereq": ['CSE325'],
    },
    {
        "name": 'CSE431',
        "prereq": ['CSE331'],
    },
    {
        "name": 'CSE440',
        "prereq": ['CSE331', 'MTH314'],
    },
    {
        "name": 'CSE472',
        "prereq": ['CSE331', 'MTH314'],
    },
    {
        "name": 'CSE476',
        "prereq": [['CSE320'], ['CSE331'], ['CSE335']],
    },
    {
        "name": 'CSE477',
        "prereq": [['CSE320'], ['CSE331'], ['CSE335']],
    },
    {
        "name": 'CSE480',
        "prereq": [['CSE331'], ['CSE335']],
    },
    {
        "name": 'CSE482',
        "prereq": ['CSE331', 'STT351', 'MTH314', 'MTH234'],
    },
]

export default courses