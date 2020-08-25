// Routes
import * as koa from 'koa';
import * as Router from 'koa-router';
import { response } from 'express';
import { studentRepo } from '../repos/student.repo';
import { createContext } from 'vm';
import { type } from 'os';

//something in my assessment type assignment is wrong but i am unsure what.
type Student = { 
    id: number,
    name: string,
    email: string,
    school_id: string,
    created_at: string,
    updated_at: string,
    institution: {
        id: number,
        name: string,
        created_at: string,
        updated_at: string,
        created_by: null,
        updated_by: null
    },
    created_by: null,
    updated_by: null,
    assessments: [{
        id: number,
        name: string,
        description: string,
        open_time: string,
        close_time: string,
        time_limit: string,
        version_number: 0,
        version_name: null,
        parent_assessment: null,
        type: null,
        is_locked: false,
        created_at: string,
        updated_at: string,
        created_by: null,
        updated_by: null
    }]
} 
type NoStudent = {error: 'No student found' };

class StudentController {
    //constructor(){}
    async display(ctx: koa.Context, next: koa.Next) {
        // Work starts here.
        //parse url to get student id and hand that to next statememt
        //extremely hacky - would find a better way for prod code
        let studentId = parseInt(ctx.request.url.charAt(ctx.request.url.length-1));
       //this gets the student object from the student repos
       // has an error state - needs to be handled
        let student = await studentRepo.getLogsByStudent(studentId);
        //what i tried to do is to check to create a custom type gaurd and check to see if its a Student or not.
        student = this.isStudent(student); 
        //after this i would parse the object to a string/array organize it by the types asked for, then run tests with jest.
    }
    //this method checks to see if handed in student object is a Student or an error. 
    isStudent(student: Student | NoStudent ): student is Student {
            return(student as Student).id !==undefined;
    }
}

export const studentController = new StudentController();

//
// Simple routing logic
//
const router = new Router();
router.get('/student/display/:studentid', studentController.display);
//call the display function based on student id.
export const StudentRouters = router;
