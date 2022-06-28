// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date
import * as _ from "lodash";
import { firstNames, Geography, lastNames, Mathematics, History, classNames, Professions } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { getRandomBirthDate, getRandomValueFromArray, fullName } from "./helpers";

export function initializeSchoolDynamically(): School {
    const maxNumberOfClasses: number = 4;
    const numberOfClasses: number = Math.floor((maxNumberOfClasses) * Math.random()) + 2;
    const classes: Classroom[] = [];
    for (let index = 0; index < numberOfClasses; index++) {
        const name: string = getRandomValueFromArray(classNames);
        const maxNumberOfProfessions: number = 2;
        const NumberOfProfessions: number = Math.floor((maxNumberOfProfessions) * Math.random()) + 1;
        const professions: string[] = [];
        for (let index = 0; index < NumberOfProfessions; index++) {
            professions.push(getRandomValueFromArray(Professions));
        }
        const teacher: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), professions)
        const maxNumberOfStudenst: number = 7;
        const NumberOfStudenst: number = Math.floor((maxNumberOfStudenst) * Math.random()) + 3;
        const students: Student[] = [];
        for (let index = 0; index < NumberOfStudenst; index++) {
            students.push(createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate()));
        }
        classes.push(createClassroom(name, teacher, students));

    }
    return {
        name: "Generated School",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: classes,
    }

}

export function initializeSchool(): School {
    const student1: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student2: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student3: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student4: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher1: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Mathematics]);

    const student5: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student6: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student7: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student8: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher2: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Geography]);

    const mathClass: Classroom = createClassroom("Math", teacher1, [student1, student2, student3, student4]);
    const geographyClass: Classroom = createClassroom("Geography", teacher2, [student5, student6, student7, student8]);
    const historyClass: Classroom = createClassroom(History, teacher2, [student5, student6, student7, student8]);

    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            mathClass,
            geographyClass,
            historyClass
        ]
    }
}

function createTeacher(firstName: string, lastName: string, professions: string[]): Teacher {
    return {
        firstName: firstName,
        lastName: lastName,
        professions: professions
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        age: () => {
            const ageDifferenceInMilliseconds: number = Date.now() - birthDate.getTime();
            const ageDate: Date = new Date(ageDifferenceInMilliseconds); // milliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },

        fullName: () => { return `${firstName} ${lastName}` },
    };
}

function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name: name,
        teacher: teacher,
        students: students,
        youngestStudent: () => {
            let student: Student = (_.maxBy(students, (_student) => _student.birthDate) as Student);
            return student;
        }
    };
}

export function getSchoolYoungestStudentFullName(classes: Classroom[]): string {
    let youngestStudentClass: Classroom = (_.maxBy(classes, (_class) => _class.youngestStudent().birthDate) as Classroom);
    return youngestStudentClass.youngestStudent().fullName();
}

export function getClassYoungestStudentFullName(_class: Classroom): string {
    return fullName(_class.youngestStudent().fullName());
}

export function printSchool(school: School): void {
    console.log("School data:");
    console.log("============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);
    console.log("Classes");
    console.log("============");
    let classesSorted: Classroom[] = _.sortBy(school.classes, [function (_class) { return _class.name }]);
    classesSorted.forEach((_class: Classroom, i: number): void => {
        let studenstSorted: Student[] = _.sortBy(_class.students, [(function (_student) { return _student.firstName }),
        (function (_student) { return _student.lastName })]);
        console.log(`Class ${i + 1}: ${_class.name}`);
        console.log(`Teacher: ${fullName(_class.teacher)}; ${_class.teacher.professions}`)
        console.log("Students:");
        studenstSorted.forEach((_student: Student, i: number) => {
            console.log(`${i + 1}: ${fullName(_student)} ${_student.age()}`)
        })
        //console.log(`Youngest student is ${_class.youngestStudent()}`)
        //console.log(``);

    });
}

export function defineTransferStudent(fromClassroom: Classroom): Student {
    return fromClassroom.students[Math.floor(Math.random() * fromClassroom.students.length)]
}

export function transferStudent(targetFullName: string, fromClassroom: Classroom, toClassrom: Classroom): void {
    let activeStudent: Student = (_.find(fromClassroom.students, function (_student) { return _student.fullName() == targetFullName }) as Student);
    if (activeStudent == undefined) {
        console.log(`There is no student with full name ${fullName} in class ${fromClassroom.name}`);
    }
    else {
        let removedStudenst: Student[] = _.remove(fromClassroom.students, function (_student) { return _student.fullName() == targetFullName })
        toClassrom.students.push(activeStudent);
    }
}

