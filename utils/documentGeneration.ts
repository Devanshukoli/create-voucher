import jsPDF from 'jspdf'
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, AlignmentType, HeadingLevel } from 'docx'

export const generatePDF = (data: any) => {
  const doc = new jsPDF()
  let yOffset = 10

  const addText = (text: string, fontSize = 12, align = 'left', bold = false) => {
    doc.setFontSize(fontSize)
    if (bold) doc.setFont(undefined, 'bold')
    else doc.setFont(undefined, 'normal')
    doc.text(text, align === 'center' ? doc.internal.pageSize.width / 2 : 10, yOffset, { align })
    yOffset += fontSize * 0.5
  }

  const addLine = () => {
    doc.line(10, yOffset, doc.internal.pageSize.width - 10, yOffset)
    yOffset += 5
  }

  // Header
  addText('TRIPS AND JOY CO. LTD.', 16, 'center', true)
  addText('34/120, Aruno Thai Soi 11', 12, 'center')
  addText('Moo 9 Banglamung,', 12, 'center')
  addText('Chonburi 20150, Thailand', 12, 'center')
  addText('(M): +66 6600-41417', 12, 'center')
  addText('(Fax) : +66 33- 032200', 12, 'center')
  addText('TAT : 14/03539', 12, 'center')
  yOffset += 10

  addText('SERVICE VOUCHER', 16, 'center', true)
  yOffset += 10

  addText(`DEAR ${data.guestName.toUpperCase()},`, 12, 'left', true)
  addText('PLEASE HAND OVER THIS VOUCHER TO OUR GUIDE AND HOTELS', 12, 'left', true)
  yOffset += 5

  // Guest Information
  addText(`GUEST NAME: ${data.guestName}   NO. OF ADULTS: ${data.adults} ADULTS   NO. OF CHILD: ${data.children} CHILDS   DATE: ${data.voucherDate}`)
  yOffset += 5

  // Travel Details
  data.travelDetails.forEach((detail: any) => {
    addText(`${detail.type} ${detail.date} ${detail.description}`)
  })
  yOffset += 5

  // Room Details
  addText('ROOM DETAILS:', 14, 'left', true)
  yOffset += 5
  const roomHeaders = ['CONFIRMATION NO.', 'HOTEL / RESORT', 'DATE', 'ROOMS TYPE', 'ROOMS']
  const roomRows = data.roomDetails.map((room: any) => [
    room.confNo,
    `${room.hotelName}\n${room.address}`,
    `${room.startDate} TO ${room.endDate}`,
    room.roomType,
    room.noOfRooms
  ])
  doc.table(10, yOffset, roomRows, roomHeaders, { autoSize: true })
  yOffset = doc.lastAutoTable.finalY + 10

  // Inclusions
  addText('INCLUSIONS:', 14, 'left', true)
  yOffset += 5
  data.inclusions.split('\n').forEach((item: string) => {
    addText(`• ${item}`)
  })
  yOffset += 10

  // Guest List
  addText('GUEST NAME LIST:', 14, 'left', true)
  yOffset += 5
  data.guestList.split('\n').forEach((guest: string, index: number) => {
    addText(`${index + 1}. ${guest}`)
  })
  yOffset += 10

  // Emergency Contact and Airport Meeting Point
  addText(`EMERGENCY CONTACT NO: ${data.emergencyContact}`, 12, 'left', true)
  addText('AIRPORT MEETING POINT:', 12, 'left', true)
  data.airportMeeting.split('\n').forEach((line: string) => {
    addText(line)
  })
  yOffset += 10

  // Itinerary
  addText(`DAY WISE ITINERARY FOR ${data.guestName.toUpperCase()}'S FAMILY`, 14, 'left', true)
  yOffset += 5
  const itineraryHeaders = ['DAY', 'DATE', 'SCHEDULE', 'SIGHTSEEING']
  const itineraryRows = data.itinerary.map((item: any) => [
    item.day,
    item.date,
    item.schedule,
    item.description
  ])
  doc.table(10, yOffset, itineraryRows, itineraryHeaders, { autoSize: true })
  yOffset = doc.lastAutoTable.finalY + 10

  // Important Notes
  addText('IMPORTANT NOTES:', 14, 'left', true)
  yOffset += 5
  data.notes.split('\n').forEach((note: string) => {
    addText(`• ${note}`)
  })

  doc.save('travel_voucher.pdf')
}

export const generateDOCX = async (data: any) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'TRIPS AND JOY CO. LTD.',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [
            new TextRun('34/120, Aruno Thai Soi 11\n'),
            new TextRun('Moo 9 Banglamung,\n'),
            new TextRun('Chonburi 20150, Thailand\n'),
            new TextRun('(M): +66 6600-41417\n'),
            new TextRun('(Fax) : +66 33- 032200\n'),
            new TextRun('TAT : 14/03539'),
          ],
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: 'SERVICE VOUCHER',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: `DEAR ${data.guestName.toUpperCase()},`,
          bold: true,
        }),
        new Paragraph({
          text: 'PLEASE HAND OVER THIS VOUCHER TO OUR GUIDE AND HOTELS',
          bold: true,
        }),
        new Paragraph({
          text: `GUEST NAME: ${data.guestName}   NO. OF ADULTS: ${data.adults} ADULTS   NO. OF CHILD: ${data.children} CHILDS   DATE: ${data.voucherDate}`,
        }),
        ...data.travelDetails.map((detail: any) => 
          new Paragraph({ text: `${detail.type} ${detail.date} ${detail.description}` })
        ),
        new Paragraph({
          text: 'ROOM DETAILS:',
          heading: HeadingLevel.HEADING_2,
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('CONFIRMATION NO.')] }),
                new TableCell({ children: [new Paragraph('HOTEL / RESORT')] }),
                new TableCell({ children: [new Paragraph('DATE')] }),
                new TableCell({ children: [new Paragraph('ROOMS TYPE')] }),
                new TableCell({ children: [new Paragraph('ROOMS')] }),
              ],
            }),
            ...data.roomDetails.map((room: any) => 
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(room.confNo)] }),
                  new TableCell({ children: [new Paragraph(`${room.hotelName}\n${room.address}`)] }),
                  new TableCell({ children: [new Paragraph(`${room.startDate} TO ${room.endDate}`)] }),
                  new TableCell({ children: [new Paragraph(room.roomType)] }),
                  new TableCell({ children: [new Paragraph(room.noOfRooms)] }),
                ],
              })
            ),
          ],
        }),
        new Paragraph({
          text: 'INCLUSIONS:',
          heading: HeadingLevel.HEADING_2,
        }),
        ...data.inclusions.split('\n').map((item: string) => 
          new Paragraph({ text: `• ${item}` })
        ),
        new Paragraph({
          text: 'GUEST NAME LIST:',
          heading: HeadingLevel.HEADING_2,
        }),
        ...data.guestList.split('\n').map((guest: string, index: number) => 
          new Paragraph({ text: `${index + 1}. ${guest}` })
        ),
        new Paragraph({
          text: `EMERGENCY CONTACT NO: ${data.emergencyContact}`,
          bold: true,
        }),
        new Paragraph({
          text: 'AIRPORT MEETING POINT:',
          bold: true,
        }),
        ...data.airportMeeting.split('\n').map((line: string) => 
          new Paragraph({ text: line })
        ),
        new Paragraph({
          text: `DAY WISE ITINERARY FOR ${data.guestName.toUpperCase()}'S FAMILY`,
          heading: HeadingLevel.HEADING_2,
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('DAY')] }),
                new TableCell({ children: [new Paragraph('DATE')] }),
                new TableCell({ children: [new Paragraph('SCHEDULE')] }),
                new TableCell({ children: [new Paragraph('SIGHTSEEING')] }),
              ],
            }),
            ...data.itinerary.map((item: any) => 
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(item.day)] }),
                  new TableCell({ children: [new Paragraph(item.date)] }),
                  new TableCell({ children: [new Paragraph(item.schedule)] }),
                  new TableCell({ children: [new Paragraph(item.description)] }),
                ],
              })
            ),
          ],
        }),
        new Paragraph({
          text: 'IMPORTANT NOTES:',
          heading: HeadingLevel.HEADING_2,
        }),
        ...data.notes.split('\n').map((note: string) => 
          new Paragraph({ text: `• ${note}` })
        ),
      ],
    }],
  })

  const blob = await Packer.toBlob(doc)
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'travel_voucher.docx'
  a.click()
  window.URL.revokeObjectURL(url)
}

