const mongoose = require('mongoose')
const { Schema } = mongoose;

function connect() {
    mongoose.connect('mongodb://127.0.0.1/stu')

    let db = mongoose.connection;

    db.once('open', () => {
    console.log('Connected to the database.');
    });

    db.on('error', (err) => {
    console.log(`Database error: ${err}`);
    });
}

connect()


const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    age: {
        type: Number,
        min: 6, max: 12,
        message: '{VALUE} in age is not supported'
    },
    grade: {
        type: Number,
        min: 1, max: 6,
        message: '{VALUE} in grade is not supported'
    },
    teachers : [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }]
})

const teacherSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    major: {
        type: String,
        enum: ['chinese', 'math', 'english'],
        message: '{VALUE} in major not supported'
    }
})

const Student = mongoose.model('Student', studentSchema)
const Teacher = mongoose.model('Teacher', teacherSchema)

async function AddStudentsAndTeachers() {
    const ch_teacher = new Teacher({
        name : 'Teacher kang',
        major: 'chinese'
    })
    const math_teacher = new Teacher({
        name : 'Teacher xing',
        major: 'math'
    })
    const english_teacher = new Teacher({
        name : 'Teacher Li',
        major: 'english'
    })

    //await Promise.all([ch_teacher.save()])
    try {
        await ch_teacher.save()
        console.log("ch_teacher._id: ", ch_teacher._id)
    }catch(error) {
        console.log('failed to save ch_teacher due to', error)
    }
    try {
        await math_teacher.save()
        console.log("math_teacher._id: ", math_teacher._id)
    }catch(error) {
        console.log('failed to save math_teacher due to', error)
    }
    try {
        await english_teacher.save()
        console.log("english_teacher._id: ", english_teacher._id)
    }catch(error) {
        console.log('failed to save english_teacher due to', error)
    }


    const stu1 = new Student({
        name: 'student1',
        age: 8,
        grade: 3,
        teachers: [ch_teacher._id]
    })

    const stu2 = new Student({
        name: 'student2',
        age: 7,
        grade: 2,
        teachers: [ch_teacher._id, math_teacher._id]
    })
    const stu3 = new Student({
        name: 'student3',
        age: 7,
        grade: 2,
        teachers: [ch_teacher._id, math_teacher._id, english_teacher._id]
    })

    try{
        await stu1.save()
        console.log("stu1._id:",stu1._id)
    }catch(error) {
        console.log("failed to save stu1 due to:", error)
    }
    try{
        await stu2.save()
        console.log("stu2._id:",stu2._id)
    }catch(error) {
        console.log("failed to save stu2 due to:", error)
    }
    try{
        await stu3.save()
        console.log("stu3._id:",stu3._id)
    }catch(error) {
        console.log("failed to save stu3 due to:", error)
    }
}

async function queryStudentAndTeacher() {
    try{
        const stu1 = await Student.findOne({'name' : 'student1'})
        .populate('teachers')
        .exec()
        console.log('stu1:', stu1)
    }catch(error) {
        console.log('failed to find student1 due to:', error)
    }

    try{
        const stu2 = await Student.findOne({'name' : 'student2'})
        .populate('teachers')
        .exec()
        console.log('stu2:', stu2)
    }catch(error) {
        console.log('failed to find student2 due to:', error)
    }
    try{
        const stu3 = await Student.findOne({'name' : 'student3'})
        .populate('teachers')
        .exec()
        console.log('stu3:', stu3)
    }catch(error) {
        console.log('failed to find student3 due to:', error)
    }
}

async function updateStudent() {
    try {
        const newStu1 = await Student.findOneAndUpdate({_id: '658d1a53cc126660d22dda12'}, {name: 'student1 new name'}, {new: true})
        console.log('newStu1:', newStu1)
    }catch(error) {
        console.log('failed to update student1 by id due to:', error)
    }
}

//AddStudentsAndTeachers()
queryStudentAndTeacher()
//updateStudent()



