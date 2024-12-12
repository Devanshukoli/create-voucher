'use client'

import { useRouter } from 'next/navigation'
import { useVoucher } from '@/context/VoucherContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generatePDF, generateDOCX } from '@/utils/documentGeneration'

export default function PreviewPage() {
  const router = useRouter()
  const { voucherData } = useVoucher()

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = () => {
    alert('Voucher submitted successfully!')
  }

  const handleDownloadPDF = () => {
    console.log('voucherData...', voucherData)
    generatePDF(voucherData)
  }

  const handleDownloadDOCX = () => {
    generateDOCX(voucherData)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">SERVICE VOUCHER</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-left mb-4">
            TRIPS AND JOY CO. LTD.<br />
            34/120, Aruno Thai Soi 11<br />
            Moo 9 Banglamung,<br />
            Chonburi 20150, Thailand<br />
            (M): +66 6600-41417<br />
            (Fax) : +66 33- 032200<br />
            TAT : 14/03539
          </p>
          <p className="font-bold mb-4">DEAR {voucherData.guestName.toUpperCase()},</p>
          <p className="font-bold mb-4">PLEASE HAND OVER THIS VOUCHER TO OUR GUIDE AND HOTELS.</p>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">GUEST NAME:</TableCell>
                <TableCell>{voucherData.guestName}</TableCell>
                <TableCell className="font-bold">NO. OF ADULTS:</TableCell>
                <TableCell>{voucherData.adults} ADULTS</TableCell>
                <TableCell className="font-bold">NO. OF CHILD:</TableCell>
                <TableCell>{voucherData.children} CHILDS</TableCell>
                <TableCell className="font-bold">DATE:</TableCell>
                <TableCell>{voucherData.voucherDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Travel Details:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {voucherData.travelDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell className="font-bold">{detail.type}</TableCell>
                  <TableCell>{detail.date}</TableCell>
                  <TableCell>{detail.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Room Details:</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CONFIRMATION NO.</TableHead>
                <TableHead>HOTEL / RESORT</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>ROOMS TYPE</TableHead>
                <TableHead>ROOMS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voucherData.roomDetails.map((room, index) => (
                <TableRow key={index}>
                  <TableCell>{room.confNo}</TableCell>
                  <TableCell>
                    {room.hotelName}<br />
                    {room.address}
                  </TableCell>
                  <TableCell>{room.startDate} TO {room.endDate}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.noOfRooms}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Inclusions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {voucherData.inclusions.split('\n').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Guest Name List</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5">
            {voucherData.guestList.split('\n').map((guest, index) => (
              <li key={index}>{guest}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Emergency Contact & Airport Meeting Point</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>EMERGENCY CONTACT NO:</strong> {voucherData.emergencyContact}</p>
          <p><strong>AIRPORT MEETING POINT:</strong> {voucherData.airportMeeting}</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Day-wise Itinerary for {voucherData.guestName}'s Family</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DAY</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>SCHEDULE</TableHead>
                <TableHead>SIGHTSEEING</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voucherData.itinerary.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.schedule}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {voucherData.notes.split('\n').map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button onClick={handleBack}>Back</Button>
        <div className="space-x-4">
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
          <Button onClick={handleDownloadDOCX}>Download DOCX</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  )
}
