import { lastNames } from "./constants";
import { Student, Teacher } from "./entities";


export function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

function isStudent(_student: any): _student is Student {
    return ((_student as Student).firstName !== undefined);
}

function isTeacher(_teacher: any): _teacher is Teacher {
    return ((_teacher as Teacher).firstName !== undefined);
}

export function getRandomBirthDate(): Date {
    const year: number = 2011 - (Math.floor(Math.random() * 3));
    const month: number = Math.floor(Math.random() * 12);
    const day: number = Math.floor(Math.random() * 29);
    return new Date(year, month, day);
}

//I've made p.4 task in more geleral way - defining fullName type protected function that can accept both Student and Teacher types and return their full names 
export function fullName(_person: any): string {
    let _firstName: String;
    let _lastName: String;
    if (isStudent(_person)) {
        _firstName = (_person as Student).firstName;
        _lastName = (_person as Student).lastName;
    }
    else {
        if (isTeacher(_person)) {
            _firstName = (_person as Teacher).firstName;
            _lastName = (_person as Teacher).lastName;
        }
        else {
            return "Wrong input type!"
        }
    }
    return `${_firstName} ${_lastName}`
}