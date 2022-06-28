import { School, Student, Classroom } from "./entities";
import {
    getSchoolYoungestStudentFullName,
    initializeSchool, printSchool, transferStudent, defineTransferStudent, initializeSchoolDynamically
} from "./services";

//const school: School = initializeSchool();
const school: School = initializeSchoolDynamically();

printSchool(school);

console.log(`Yougest student of school is:`)
console.log(getSchoolYoungestStudentFullName(school.classes));

// let fromClass: Classroom = school.classes[0];
// let toClass: Classroom = school.classes[1];
// let transfertStudent: Student = defineTransferStudent(fromClass);
// console.log(``)
// console.log(`Transfert student is ${transfertStudent.fullName()}`)
// console.log(``)
// transferStudent(transfertStudent.fullName(), fromClass, toClass);
// console.log(`School consist after transfer`)
// printSchool(school);
