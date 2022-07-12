from excel import Excel
from utility import Utility

class Main():
    nonMuslimStudent = [
        "Keatryn Kezia P. Sihombing",
        "Nicholas Davin Yang",
        "O'neil Kerry Laurent",
        "Yehezkiel Dio Sinolungan"
    ]

    def main():
        workbook = Excel("./scripts/excel/List Tugas Gabunggan.xlsx")

        assignmentData = workbook.get_value_multiple_2d("C1", "AT4")
        
        for monthTextIndex, monthText in enumerate(assignmentData[0]):
            if(monthText is None):
                assignmentData[0][monthTextIndex] = assignmentData[0][monthTextIndex-1]

        
        for weekTextIndex, weekText in enumerate(assignmentData[1]):
            if(weekText is None):
                assignmentData[1][weekTextIndex] = assignmentData[1][weekTextIndex-1]

        
        assignmentDataGrouped = []
        assignmentData = [list(reversed(r)) for r in zip(*assignmentData[::-1])]
        for assignment in assignmentData:
            monthIsValid = True
            weekIsValid = True

            for month in assignmentDataGrouped:
                if(assignment[0] is month[0]):
                    monthIsValid = False

                    for week in month[1]:
                        if(assignment[1] is week[0]):
                            weekIsValid = False


            if(monthIsValid):
                if(weekIsValid):
                    assignmentDataGrouped.append([assignment[0], [[assignment[1], [assignment[3]]]]])

            
            elif(not monthIsValid):
                if(weekIsValid):
                    for month in assignmentDataGrouped:
                        if(assignment[0] is month[0]):
                            month[1].append([assignment[1], [assignment[3]]])

                
                elif(not weekIsValid):
                    for month in assignmentDataGrouped:
                        if(assignment[0] is month[0]): 
                            for week in month[1]:
                                if(assignment[1] is week[0]): 
                                    week[1].append(assignment[3])
                            

        monthCount = 1
        weekCount = 1
        monthList = []
        for monthIndex, month in enumerate(assignmentDataGrouped):

            weekList = []
            for weekIndex, week in enumerate(month[1]):

                assignmentList = []
                for assignmentIndex, assignment in enumerate(week[1]):
                    assignmentObject = {
                        "id": assignmentIndex + 1,
                        "subject": assignment.strip("0123456789"),
                        "count": int(assignment.strip("ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
                    } 

                    assignmentList.append(assignmentObject)


                weekObject = {
                    "id": weekIndex + 1,
                    "week": weekCount,
                    "assignment": assignmentList
                }

                weekList.append(weekObject)
                weekCount += 1


            monthObject = {
                "id": monthIndex + 1,
                "month": monthCount,
                "week": weekList
            }

            monthList.append(monthObject)
            monthCount += 1


        Utility.writeJSON("./scripts/json/assignment.json", monthList)

        studentData = workbook.get_value_multiple_2d("B5", "AT39")

        studentList = []
        for studentIndex, student in enumerate(studentData):
            
            assignmentList = []
            assignmentCount = 1
            for month in monthList:
                for week in month["week"]:
                    for assignment in week["assignment"]:
                        assignmentObject = {
                            "id": assignmentCount,
                            "monthId": month["id"],
                            "weekId": week["id"],
                            "assignmentId": assignment["id"],
                            "status": Utility.convertStatus(student[assignmentCount])
                        }

                        assignmentList.append(assignmentObject)
                        assignmentCount += 1
                        

            studentObject = {
                "id": studentIndex + 1,
                "name": student[0],
                "isMuslim": True if student[0] not in Main.nonMuslimStudent else False,
                "assignment": assignmentList
            }

            studentList.append(studentObject)


        Utility.writeJSON("./scripts/json/student.json", studentList)


Main.main()