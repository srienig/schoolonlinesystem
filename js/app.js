// Data Management
const Storage = {
    getStudents: () => {
        const students = localStorage.getItem('school_students');
        return students ? JSON.parse(students) : [];
    },
    saveStudent: (student) => {
        const students = Storage.getStudents();
        students.push(student);
        localStorage.setItem('school_students', JSON.stringify(students));
    },
    getAttendance: () => {
        const attendance = localStorage.getItem('school_attendance');
        return attendance ? JSON.parse(attendance) : {};
    },
    saveAttendance: (date, records) => {
        const attendance = Storage.getAttendance();
        attendance[date] = records;
        localStorage.setItem('school_attendance', JSON.stringify(attendance));
    },
    // Seed initial data if empty
    seedData: () => {
        if (!localStorage.getItem('school_students')) {
            const dummyStudents = [
                { id: 'S001', name: 'Alice Johnson', grade: '10', section: 'A', contact: '555-0101' },
                { id: 'S002', name: 'Bob Smith', grade: '10', section: 'B', contact: '555-0102' },
                { id: 'S003', name: 'Charlie Brown', grade: '9', section: 'A', contact: '555-0103' },
                { id: 'S004', name: 'Diana Prince', grade: '11', section: 'C', contact: '555-0104' },
                { id: 'S005', name: 'Evan Wright', grade: '10', section: 'A', contact: '555-0105' },
            ];
            localStorage.setItem('school_students', JSON.stringify(dummyStudents));
        }
    },
    getStudent: (id) => {
        const students = Storage.getStudents();
        return students.find(s => s.id === id);
    },
    updateStudent: (updatedStudent) => {
        const students = Storage.getStudents();
        const index = students.findIndex(s => s.id === updatedStudent.id);
        if (index !== -1) {
            students[index] = updatedStudent;
            localStorage.setItem('school_students', JSON.stringify(students));
        }
    }
};

// Initialize
Storage.seedData();

// Stats Calculation for Dashboard
function getStats() {
    const students = Storage.getStudents();
    const today = new Date().toISOString().split('T')[0];
    const attendance = Storage.getAttendance();
    const todayAttendance = attendance[today] || [];

    // Count present students for today
    const presentCount = todayAttendance.filter(r => r.status === 'Present').length;

    return {
        totalStudents: students.length,
        presentToday: presentCount,
        attendanceRate: students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0
    };
}
