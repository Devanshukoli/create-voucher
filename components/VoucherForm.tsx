'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useVoucher } from '@/context/VoucherContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, MinusIcon } from 'lucide-react'

export default function VoucherForm() {
  const router = useRouter()
  const { voucherData, setVoucherData } = useVoucher()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/preview')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setVoucherData(prev => ({ ...prev, [name]: value }))
  }

  const handleTravelDetailChange = (index: number, field: string, value: string) => {
    setVoucherData(prev => ({
      ...prev,
      travelDetails: prev.travelDetails.map((detail, i) => 
        i === index ? { ...detail, [field]: value } : detail
      )
    }))
  }

  const addTravelDetail = () => {
    setVoucherData(prev => ({
      ...prev,
      travelDetails: [...prev.travelDetails, { type: '', date: '', description: '' }]
    }))
  }

  const removeTravelDetail = (index: number) => {
    setVoucherData(prev => ({
      ...prev,
      travelDetails: prev.travelDetails.filter((_, i) => i !== index)
    }))
  }

  const handleRoomDetailChange = (index: number, field: string, value: string) => {
    setVoucherData(prev => ({
      ...prev,
      roomDetails: prev.roomDetails.map((room, i) => 
        i === index ? { ...room, [field]: value } : room
      )
    }))
  }

  const addRoomDetail = () => {
    setVoucherData(prev => ({
      ...prev,
      roomDetails: [...prev.roomDetails, { confNo: '', hotelName: '', address: '', startDate: '', endDate: '', roomType: '', noOfRooms: '' }]
    }))
  }

  const removeRoomDetail = (index: number) => {
    setVoucherData(prev => ({
      ...prev,
      roomDetails: prev.roomDetails.filter((_, i) => i !== index)
    }))
  }

  const handleItineraryChange = (index: number, field: string, value: string) => {
    setVoucherData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addItineraryItem = () => {
    setVoucherData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: '', date: '', schedule: '', description: '' }]
    }))
  }

  const removeItineraryItem = (index: number) => {
    setVoucherData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="guestName">Guest Name</Label>
            <Input
              id="guestName"
              name="guestName"
              value={voucherData.guestName}
              onChange={handleInputChange}
              placeholder="Enter guest name"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="adults">Number of Adults</Label>
              <Input
                id="adults"
                name="adults"
                type="number"
                min="1"
                value={voucherData.adults}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="children">Number of Children</Label>
              <Input
                id="children"
                name="children"
                type="number"
                min="0"
                value={voucherData.children}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="voucherDate">Voucher Creation Date</Label>
            <Input
              id="voucherDate"
              name="voucherDate"
              type="date"
              value={voucherData.voucherDate}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Travel Details</CardTitle>
        </CardHeader>
        <CardContent>
          {voucherData.travelDetails.map((detail, index) => (
            <div key={index} className="space-y-4 mb-4 pb-4 border-b">
              <div>
                <Label htmlFor={`travelType-${index}`}>Travel Type</Label>
                <Input
                  id={`travelType-${index}`}
                  value={detail.type}
                  onChange={(e) => handleTravelDetailChange(index, 'type', e.target.value)}
                  placeholder="e.g., DATE OF PICK UP"
                />
              </div>
              <div>
                <Label htmlFor={`travelDate-${index}`}>Date</Label>
                <Input
                  id={`travelDate-${index}`}
                  type="date"
                  value={detail.date}
                  onChange={(e) => handleTravelDetailChange(index, 'date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`travelDescription-${index}`}>Description</Label>
                <Input
                  id={`travelDescription-${index}`}
                  value={detail.description}
                  onChange={(e) => handleTravelDetailChange(index, 'description', e.target.value)}
                  placeholder="e.g., ARRIVAL HKT AIRPORT FD-3017 16:55 PM"
                />
              </div>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => removeTravelDetail(index)}
              >
                <MinusIcon className="mr-2 h-4 w-4" /> Remove Travel Detail
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addTravelDetail} className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Travel Detail
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Room Details</CardTitle>
        </CardHeader>
        <CardContent>
          {voucherData.roomDetails.map((room, index) => (
            <div key={index} className="space-y-4 mb-4 pb-4 border-b">
              <div>
                <Label htmlFor={`confNo-${index}`}>Confirmation Number</Label>
                <Input
                  id={`confNo-${index}`}
                  value={room.confNo}
                  onChange={(e) => handleRoomDetailChange(index, 'confNo', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`hotelName-${index}`}>Hotel Name</Label>
                <Input
                  id={`hotelName-${index}`}
                  value={room.hotelName}
                  onChange={(e) => handleRoomDetailChange(index, 'hotelName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`address-${index}`}>Address</Label>
                <Input
                  id={`address-${index}`}
                  value={room.address}
                  onChange={(e) => handleRoomDetailChange(index, 'address', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    value={room.startDate}
                    onChange={(e) => handleRoomDetailChange(index, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    value={room.endDate}
                    onChange={(e) => handleRoomDetailChange(index, 'endDate', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`roomType-${index}`}>Room Type</Label>
                <Input
                  id={`roomType-${index}`}
                  value={room.roomType}
                  onChange={(e) => handleRoomDetailChange(index, 'roomType', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`noOfRooms-${index}`}>Number of Rooms</Label>
                <Input
                  id={`noOfRooms-${index}`}
                  type="number"
                  min="1"
                  value={room.noOfRooms}
                  onChange={(e) => handleRoomDetailChange(index, 'noOfRooms', e.target.value)}
                />
              </div>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => removeRoomDetail(index)}
              >
                <MinusIcon className="mr-2 h-4 w-4" /> Remove Room
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addRoomDetail} className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Room Detail
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inclusions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="inclusions"
            name="inclusions"
            value={voucherData.inclusions}
            onChange={handleInputChange}
            placeholder="Enter inclusions (one per line)"
            rows={5}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guest Name List</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="guestList"
            name="guestList"
            value={voucherData.guestList}
            onChange={handleInputChange}
            placeholder="Enter guest names (one per line)"
            rows={5}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact & Airport Meeting Point</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              value={voucherData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Enter emergency contact number"
            />
          </div>
          <div>
            <Label htmlFor="airportMeeting">Airport Meeting Point</Label>
            <Textarea
              id="airportMeeting"
              name="airportMeeting"
              value={voucherData.airportMeeting}
              onChange={handleInputChange}
              placeholder="Enter airport meeting point details"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Day-wise Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Sightseeing</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voucherData.itinerary.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={item.day}
                      onChange={(e) => handleItineraryChange(index, 'day', e.target.value)}
                      placeholder="Day"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={item.date}
                      onChange={(e) => handleItineraryChange(index, 'date', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.schedule}
                      onChange={(e) => handleItineraryChange(index, 'schedule', e.target.value)}
                      placeholder="Schedule"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={item.description}
                      onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                      placeholder="Sightseeing description"
                      rows={2}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeItineraryItem(index)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button type="button" onClick={addItineraryItem} className="w-full mt-4">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Itinerary Item
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="notes"
            name="notes"
            value={voucherData.notes}
            onChange={handleInputChange}
            placeholder="Enter important notes (one per line)"
            rows={5}
          />
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Preview Voucher</Button>
    </form>
  )
}

