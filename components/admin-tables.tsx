import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, XCircle, CreditCard, Hash } from "lucide-react" 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OrderDetails {
  id: number
  user: {
    name: string
    email: string
    phone?: string
  }
  amount: string
  status: string
  createdAt: string
  accountType?: string
  platformType?: string
  platformLogin?: string
  platformPassword?: string
  server?: string
  startingBalance?: number
  currentBalance?: number
  profitTarget?: number
  paymentProof?: string
  orderId?: string
  paymentMethod?: string
  txid?: string
}

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

const mockOrders: OrderDetails[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
    amount: "$1000",
    status: "Completed",
    createdAt: "2023-04-05",
    accountType: "Challenge Phase-1",
    platformType: "MT4",
    platformLogin: "SAA",
    platformPassword: "password123",
    server: "None",
    startingBalance: 5003,
    currentBalance: 5000,
    profitTarget: 400,
    paymentProof: "https://example.com/proof1.jpg",
    paymentMethod: "Credit Card",
    txid: "TXN123456789"
  },
  {
    id: 2,
    user: {
      name: "Jane Smith", 
      email: "jane@example.com",
      phone: "+1987654321",
    },
    amount: "$1500",
    status: "Pending",
    createdAt: "2023-04-10",
    accountType: "Challenge Phase-2",
    platformType: "MT5",
    platformLogin: "SAB",
    platformPassword: "password456",
    server: "None",
    startingBalance: 10000,
    currentBalance: 11000,
    profitTarget: 800,
    paymentProof: "https://example.com/proof2.jpg",
    paymentMethod: "Bank Transfer",
    txid: "TXN987654321"
  },
]

interface AdminTablesProps {
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | null
}

export function AdminTables({ selectedSection }: AdminTablesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders, setOrders] = useState(mockOrders)
  const [completedOrders, setCompletedOrders] = useState<OrderDetails[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedPaymentProof, setSelectedPaymentProof] = useState<string | null>(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/auth/users")
      .then((response) => response.json())
      .then((data) => {
        const formattedUsers = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: new Date().toISOString().split("T")[0],
        }))
        setUsers(formattedUsers)
      })
      .catch((error) => console.error("Error fetching users:", error))
  }, [])

  useEffect(() => {
    // Fetch completed orders
    fetch("http://127.0.0.1:8000/order/completed_orders")
      .then((response) => response.json())
      .then((data) => {
        const formattedCompletedOrders = data.map((order: any) => ({
          id: order.complete_order_id,
          orderId: order.order_id,
          user: {
            name: order.username,
            email: "",
          },
          amount: order.account_size,
          status: "Completed",
          createdAt: new Date().toISOString().split("T")[0],
          accountType: order.challenge_type,
          platformType: order.platform,
          platformLogin: order.platform_login,
          platformPassword: order.platform_password,
          server: order.server,
          startingBalance: parseInt(order.account_size),
          currentBalance: parseInt(order.account_size),
          paymentMethod: order.payment_method,
          txid: order.txid
        }))
        setCompletedOrders(formattedCompletedOrders)
      })
      .catch((error) => console.error("Error fetching completed orders:", error))

    // Fetch pending orders
    fetch("http://127.0.0.1:8000/order/orders")
      .then((response) => response.json())
      .then((data) => {
        const formattedOrders = data.map((order: any) => ({
          id: order.id,
          user: {
            name: order.username,
            email: order.email,
          },
          amount: order.account_size,
          status: "Pending",
          createdAt: new Date().toISOString().split("T")[0],
          accountType: order.challenge_type,
          platformType: order.platform,
          platformLogin: order.txid,
          platformPassword: "N/A",
          server: "None",
          startingBalance: parseInt(order.account_size),
          currentBalance: parseInt(order.account_size),
          profitTarget: 0,
          paymentProof: order.img,
          paymentMethod: order.payment_method,
          txid: order.txid
        }))

        // Filter out orders that are in completedOrders
        const pendingOrders = formattedOrders.filter(
          (order) => !completedOrders.some((completedOrder) => completedOrder.orderId === order.id.toString())
        )
        setOrders(pendingOrders)
      })
      .catch((error) => console.error("Error fetching orders:", error))
  }, [])

  const filteredOrders = (selectedSection === "completedOrders" ? completedOrders : orders).filter(
    (order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderTable = () => {
    switch (selectedSection) {
      case "users":
        return (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      case "orders":
      case "completedOrders":
      case "failedOrders":
        return (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Badge variant="outline" className="flex items-center gap-2 w-fit">
                          <CreditCard className="h-4 w-4" />
                          {order.paymentMethod || "N/A"}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-2 w-fit">
                          <Hash className="h-4 w-4" />
                          {order.txid || "N/A"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>View and edit complete order and user details.</DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="order" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="order">Order Details</TabsTrigger>
                                <TabsTrigger value="user">User Details</TabsTrigger>
                              </TabsList>
                              <TabsContent value="order" className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label>Account Type</Label>
                                    <Input value={order.accountType} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Platform Type</Label>
                                    <Input value={order.platformType} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Platform Login</Label>
                                    <Input value={order.platformLogin} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Platform Password</Label>
                                    <Input value={order.platformPassword} type="password" className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Server</Label>
                                    <Input value={order.server} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <Input value={order.status} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Starting Balance</Label>
                                    <Input value={order.startingBalance?.toString()} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Current Balance</Label>
                                    <Input value={order.currentBalance?.toString()} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Profit Target</Label>
                                    <Input value={order.profitTarget?.toString()} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Payment Method</Label>
                                    <Input value={order.paymentMethod} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Transaction ID</Label>
                                    <Input value={order.txid} className="mt-1" />
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="user" className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label>Name</Label>
                                    <Input value={order.user.name} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <Input value={order.user.email} className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>Phone</Label>
                                    <Input value={order.user.phone} className="mt-1" />
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                            <DialogFooter>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          Confirm
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPaymentProof(order.paymentProof || null)}
                            >
                              Payment Proof
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Payment Proof</DialogTitle>
                              <DialogDescription>View or upload payment proof for this order.</DialogDescription>
                            </DialogHeader>
                            {selectedPaymentProof && (
                              <div className="grid gap-4 py-4">
                                <img src={`data:image/jpeg;base64,${selectedPaymentProof}`} alt="Payment Proof" className="w-full h-auto" />
                              </div>
                            )}
                            <DialogFooter>
                              <Button type="submit">Upload</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedSection ? selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1) : "Select a section"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${selectedSection}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          {renderTable()}
        </CardContent>
      </Card>
    </motion.div>
  )
}
