"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../db/db");
function insertUser(studentName, rollNo, branch, sgpa, subjects) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.db.roland.create({
            data: {
                studentName,
                rollNo,
                branch,
                sgpa,
                subjects,
            },
        });
        console.log(res);
    });
}
function getSubjects(rollNo, semId, type) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `http://results.bput.ac.in/student-results-subjects-list?semid=${semId}&rollNo=${rollNo}&session=${type}%20(2023-24)`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json; charset=utf-8",
                Origin: "http://results.bput.ac.in",
                Referer: "http://results.bput.ac.in/",
                "Accept-Language": "en-IN,en-GB;q=0.9,en;q=0.8",
                Host: "results.bput.ac.in",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
                "Content-Length": "0",
                "Accept-Encoding": "gzip, deflate",
                Connection: "keep-alive",
                "X-Requested-With": "XMLHttpRequest",
            },
        };
        try {
            const res = yield axios_1.default.request(config);
            const jsonSubject = res.data;
            // console.log("Received data for subjects:", jsonSubject);
            if (Array.isArray(jsonSubject) && jsonSubject.length > 0) {
                const subjects = jsonSubject.map((subject) => ({
                    subName: subject.subjectName,
                    subGrade: subject.grade,
                }));
                return subjects;
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error(`Error fetching data for roll number ${rollNo}:`, error);
            return [];
        }
    });
}
function getSgpa(rollNo, semId, type) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `https://results.bput.ac.in/student-results-sgpa?rollNo=${rollNo}&semid=${semId}&session=${type}%20(2023-24)`,
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-length": "0",
                "content-type": "application/json; charset=utf-8",
                origin: "https://results.bput.ac.in",
                priority: "u=1, i",
                referer: "https://results.bput.ac.in/",
                "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                "x-requested-with": "XMLHttpRequest",
            },
        };
        const response = yield axios_1.default.request(config);
        const jsonData = response.data;
        //   console.log(jsonData)
        return {
            totalGradePoints: jsonData.totalGradePoints,
            sgpa: jsonData.sgpa,
        };
        //   .then((response) => {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    });
}
function getDetails(rollNo) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `https://results.bput.ac.in/student-detsils-results?rollNo=${rollNo}`,
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-length": "0",
                "content-type": "application/json; charset=utf-8",
                origin: "https://results.bput.ac.in",
                priority: "u=1, i",
                referer: "https://results.bput.ac.in/",
                "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                "x-requested-with": "XMLHttpRequest",
            },
        };
        const response = yield axios_1.default.request(config);
        const jsonData = response.data;
        return {
            rollNo: jsonData.rollNo,
            studentName: jsonData.studentName,
            branchName: jsonData.branchName,
            courseName: jsonData.courseName,
            collegeName: jsonData.collegeName,
        };
    });
}
function fetchData(rollNo, semId, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const sgpadata = yield getSgpa(rollNo, semId, type);
        const userDetail = yield getDetails(rollNo);
        const subjects = yield getSubjects(rollNo, semId, type);
        // console.log(sgpadata,
        //         userDetail
        // )
        return {
            userDetail,
            sgpadata,
            subjects,
        };
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 2301204001; i <= 2301204234; i++) {
            try {
                const data = yield fetchData(i.toString(), "1", "Odd");
                if (data.userDetail && data.sgpadata && data.subjects) {
                    const studentName = data.userDetail.studentName;
                    const rollNo = data.userDetail.rollNo;
                    const branch = data.userDetail.branchName;
                    const sgpa = data.sgpadata.sgpa;
                    const subjects = data.subjects.map((subject) => `${subject.subName}: ${subject.subGrade}`);
                    yield insertUser(studentName, rollNo, branch, sgpa, subjects);
                }
                else {
                    console.log(`Data not found for roll number ${i}`);
                }
            }
            catch (error) {
                console.error(`Error fetching data for roll number ${i}:`, error);
            }
        }
    });
}
main();
