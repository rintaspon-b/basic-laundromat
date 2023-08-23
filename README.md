# basic-laundromat

**basic-laundromat** is a simulation of a real-world coin-operated laundry machine system. It includes an API to facilitate interactions between users and the system.

(**basic-laundromat** เป็นการจำลองระบบเการทำงานของเครื่องซักผ้าหยอดเหรียญในชีวิตจริง โดยมีการเขียน api เพื่อเป็นตัวแทนคำสั่งทำงานระหว่างผู้ใช้งานและระบบ)

## Flowchart
![Flowchart](https://github.com/rintaspon-b/basic-laundromat/assets/138157754/f3c17156-e04a-481d-b338-07dc715b8073)

## Use Cases
![Use Cases](https://github.com/rintaspon-b/basic-laundromat/assets/138157754/56978214-e768-401b-a956-f6cb4efbe1d6)

## System Overview
![System Overview](https://github.com/rintaspon-b/basic-laundromat/assets/138157754/c253bc5e-4d7d-47aa-8fc9-cc772829b875)

## User Interface
![User Interface](https://github.com/rintaspon-b/basic-laundromat/assets/138157754/6fa55b4d-0672-4f19-a9d7-e08466bf9a87)

## Database
![Database](https://github.com/rintaspon-b/basic-laundromat/assets/138157754/f1fa2637-f479-429e-a29c-1e133cb60376)

## API Endpoints
- `GET /api/token`: Retrieves a JWT Token for authorization purposes (Assumes direct access without Username/Password; Token expires in 8 hours) - ใช้สำหรับเรียก JWT Token เพื่อใช้ในการ Authorization (สมมติให้สามารถเรียกได้เลยโดยไม่ต้องใช้ Username / Password) (Token มีอายุ 8 ชม.)
- `GET /api/test`: Used for testing API access - ใช้สำหรับทดสอบการเรียก API
- `GET /api/line/test`: Tests sending messages to a LINE group - ใช้สำหรับทดสอบการส่งข้อความไปยัง LINE group - userTimer = true หมายถึง จะให้โปรแกรมหน่วงเวลาตอนส่งข้อความ โดยการหน่วงเวลาจะเริ่มต้นที่ 60 วินาทีก่อนหมดเวลา
  - `userTimer=true`: Delays message sending by 60 seconds.
- `GET /api/machines`: Displays the total number of laundry machines and their statuses - ใช้สำหรับแสดงจำนวนเครื่องซักผ้า (machine) ทั้งหมดพร้อมสถานะของ machine
- `POST /api/machine`: Adds laundry machine data to the system. Initial status is IDLE - ใช้สำหรับนำข้อมูลเครื่องซักผ้า (machine) เข้าระบบ โดยสถานะเริ่มต้นของเครื่องจะเป็น IDLE
- `POST /api/machine/start`: Initiates a laundry machine to start working. Requires machine ID and duration - ใช้สำหรับสั่งให้เครื่องซักผ้าทำงาน โดยสิ่งที่ต้องการคือ id ของเครื่องและระยะเวลาที่ต้องการให้เครื่่องซักผ้านี้ทำงาน
- `POST /api/machine/stop`: Stops a laundry machine immediately. Requires machine ID - ใช้สำหรับสั่งให้เครื่องซักผ้าหยุดทำงานทันที โดยสิ่งที่ต้องการคือ id ของเครื่อง
- `DELETE /api/machine/delete`: Removes a laundry machine from the system. Requires machine ID - ใช้สำหรับลบเครื่องซักผ้าออกจากระบบ โดยสิ่งที่ต้องการคือ id ของเครื่อง


