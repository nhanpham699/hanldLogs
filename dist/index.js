"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const csv_writer_1 = require("csv-writer");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const stepName = [
    `Bước 0: run app --- `,
    `Bước 1: check eligible --- `,
    `Bước 1.1: nhấn tiếp tục ở m.h số 2 --- `,
    `Bước 1.2: không bật cam do deny bật cam --- `,
    `Bước 1.3: không detect được cam --- `,
    `Bước 2: chụp mặt trước --- `,
    `Bước 2.1: chụp mặt trước FAIL --- `,
    `Bước 3: chụp mặt sau --- `,
    `Bước 4: chụp khuôn mặt --- `,
    `Bước 5: chấm điểm khuôn mặt --- `,
    `Bước 6: lưu ekyc logs --- `,
    `Bước 7: đi đến m.h xác nhận tt --- `,
    `Bước 8: đi đến m.h xác nhận bổ sung --- `,
    `Bước 9: đi đến m.h mật khẩu --- `,
    `Bước 10: nhập mật khẩu và gửi otp --- `,
    `Bước 11: tạo tài khoản --- `,
];
const step = [
    { des: "Bước 0: run app --- ", name: "step0" },
    { des: `Bước 1: check eligible --- `, name: "check eligible [step1]" },
    { des: `Bước 1.1: nhấn tiếp tục ở m.h số 2 --- `, name: "[step1.1" },
    { des: `Bước 1.2: không bật cam do deny bật cam --- `, name: "[step1.2]" },
    { des: `Bước 1.3: không detect được cam --- `, name: "[step1.3]" },
    { des: `Bước 2: chụp mặt trước --- `, name: "[step2]" },
    { des: `Bước 2.1: chụp mặt trước FAIL --- `, name: "[step2.1]" },
    { des: `Bước 3: chụp mặt sau --- `, name: "[step3]" },
    { des: `Bước 4: chụp khuôn mặt --- `, name: "[step4]" },
    { des: `Bước 5: chấm điểm khuôn mặt --- `, name: "[step5]" },
    { des: `Bước 6: lưu ekyc logs --- `, name: "[step6]" },
    { des: `Bước 7: đi đến m.h xác nhận tt --- `, name: "[step7]" },
    { des: `Bước 8: đi đến m.h xác nhận bổ sung --- `, name: "[step8]" },
    { des: `Bước 9: đi đến m.h mật khẩu --- `, name: "[step9]" },
    { des: `Bước 10: nhập mật khẩu và gửi otp --- `, name: "[step10]" },
    { des: `Bước 11: tạo tài khoản --- `, name: "[step11]" },
];
const toDate = (date) => {
    const d = new Date();
    let month = "" + (d.getMonth() + 1);
    let day = (Number("" + d.getDate()) + date).toString();
    const year = d.getFullYear();
    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;
    return [year, month, day].join("-");
};
const convertArrayOfObjectsToCSV = (args) => {
    const data = args.data;
    if (!data || !data.length)
        return;
    const columnDelimiter = args.columnDelimiter || ',';
    const lineDelimiter = args.lineDelimiter || '\n';
    const keys = Object.keys(data[0]);
    let result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    data.forEach((item) => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0)
                result += columnDelimiter;
            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });
    return result;
};
const job = () => {
    const filePath = path.join("/", "app.log");
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
        if (!err) {
            // hanlde log in here
            const lines = data.split("\n");
            let newData = "";
            for (const line of lines) {
                if (line.slice(1, 11) === toDate(0)) {
                    newData += line;
                }
                if (line.slice(1, 11) === toDate(-1)) {
                    newData += line;
                }
                if (line.slice(1, 11) === toDate(-2)) {
                    newData += line;
                }
            }
            // for (const s of step) {
            // }
            const step0 = newData.split("step0").length - 1;
            const step1 = newData.split("check eligible [step1]").length - 1;
            const step1a1 = newData.split("[step1.1]").length - 1;
            const step1a2 = newData.split("[step1.2]").length - 1;
            const step1a3 = newData.split("[step1.3]").length - 1;
            const step2 = newData.split("[step2]").length - 1;
            const step2a1 = newData.split("[step2.1]").length - 1;
            const step3 = newData.split("[step3]").length - 1;
            const step4 = newData.split("[step4]").length - 1;
            const step5 = newData.split("[step5]").length - 1;
            const step6 = newData.split("[step6]").length - 1;
            const step7 = newData.split("[step7]").length - 1;
            const step8 = newData.split("[step8]").length - 1;
            const step9 = newData.split("[step9]").length - 1;
            const step10 = newData.split("[step10]").length - 1;
            const step11 = newData.split("[step11]").length - 1;
            const stuckValidateEkyc = newData.split("[stuck in validate activeEkyc]").length - 1;
            const logData = [
                { des: "Bước 0: run app", name: step0 },
                { des: `Bước 1: check eligible`, name: step1 },
                { des: `Bước 1.1: nhấn tiếp tục ở m.h số 2`, name: step1a1 },
                { des: `Bước 1.2: không bật cam do deny bật cam`, name: step1a2 },
                { des: `Bước 1.3: không detect được cam`, name: step1a3 },
                { des: `Bước 2: chụp mặt trước`, name: step2 },
                { des: `Bước 2.1: chụp mặt trước FAIL`, name: step2a1 },
                { des: `Bước 3: chụp mặt sau`, name: step3 },
                { des: `Bước 4: chụp khuôn mặt`, name: step4 },
                { des: `Bước 5: chấm điểm khuôn mặt`, name: step5 },
                { des: `Bước 6: lưu ekyc logs`, name: step6 },
                { des: `Bước 7: đi đến m.h xác nhận tt`, name: step7 },
                { des: `Bước 8: đi đến m.h xác nhận bổ sung`, name: step8 },
                { des: `Bước 9: đi đến m.h mật khẩu`, name: step9 },
                { des: `Bước 10: nhập mật khẩu và gửi otp`, name: step10 },
                { des: `Bước 11: tạo tài khoản`, name: step11 },
                { des: `bị stuck khi ekyc quá 10 lần`, name: stuckValidateEkyc },
            ];
            const fields = [{ id: 'des', title: 'Mô tả' }, { id: 'name', title: 'Số lượng' }];
            const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                path: './logData.csv',
                header: fields,
                alwaysQuote: true,
            });
            const _export = () => __awaiter(void 0, void 0, void 0, function* () {
                yield csvWriter.writeRecords(logData);
            });
            setImmediate(() => __awaiter(void 0, void 0, void 0, function* () {
                yield _export();
            }));
            // const x = new Parser(fields)
            // const content = x.parse(logData)
            // console.log(content)
            // const downloadCSV = (args: any) => {
            //   let csv = convertArrayOfObjectsToCSV({
            //     data: logData
            //   });
            //   if (!csv) return;
            //   const filename = args.filename || 'logData.csv';
            //   if (!csv.match(/^data:text\/csv/i)) {
            //     csv = 'data:text/csv;charset=utf-8,' + csv;
            //   }
            //   const dataCSV = encodeURI(csv);
            //   const link = document.createElement('a');
            //   link.setAttribute('href', dataCSV);
            //   link.setAttribute('download', filename);
            //   link.click();
            // }
            // downloadCSV(logData)
            // console.log(`Bước 0: run app --- `, step0);
            // console.log(`Bước 1: check eligible --- `, step1);
            // console.log(`Bước 1.1: nhấn tiếp tục ở m.h số 2 --- `, step1a1);
            // console.log(`Bước 1.2: không bật cam do deny bật cam --- `, step1a2);
            // console.log(`Bước 1.3: không detect được cam --- `, step1a3);
            // console.log(`Bước 2: chụp mặt trước --- `, step2);
            // console.log(`Bước 2.1: chụp mặt trước FAIL --- `, step2a1);
            // console.log(`Bước 3: chụp mặt sau --- `, step3);
            // console.log(`Bước 4: chụp khuôn mặt --- `, step4);
            // console.log(`Bước 5: chấm điểm khuôn mặt --- `, step5);
            // console.log(`Bước 6: lưu ekyc logs --- `, step6);
            // console.log(`Bước 7: đi đến m.h xác nhận tt --- `, step7);
            // console.log(`Bước 8: đi đến m.h xác nhận bổ sung --- `, step8);
            // console.log(`Bước 9: đi đến m.h mật khẩu --- `, step9);
            // console.log(`Bước 10: nhập mật khẩu và gửi otp --- `, step10);
            // console.log(`Bước 11: tạo tài khoản --- `, step11);
            // console.log(`bị stuck khi ekyc quá 10 lần --- `, stuckValidateEkyc);
        }
        else {
            console.log(err);
        }
    });
    console.log("The answer to life, the universe, and everything!");
};
job();
//# sourceMappingURL=index.js.map