"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { services as initialServices, Service } from "@/lib/services";
import { Trash2, Edit } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [router]);
  
  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    router.push('/admin');
  };

  const handleAddNew = () => {
    setCurrentService({
      id: Math.max(...services.map(s => s.id), 0) + 1,
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      price: '',
      highlights: [],
      Icon: 'Code' as any, // Default icon
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };
  
  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (serviceToDelete) {
      setServices(services.filter(s => s.id !== serviceToDelete.id));
      toast({ title: "Service Deleted", description: `"${serviceToDelete.title}" has been removed.` });
    }
    setIsDeleteAlertOpen(false);
    setServiceToDelete(null);
  };
  

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentService) {
        // Check if it's a new service or an existing one
        const isNew = !services.some(s => s.id === currentService.id);
        if (isNew) {
            setServices([...services, currentService]);
            toast({ title: "Service Added", description: `"${currentService.title}" has been added.` });
        } else {
            setServices(services.map(s => s.id === currentService.id ? currentService : s));
            toast({ title: "Service Updated", description: `"${currentService.title}" has been updated.` });
        }
    }
    setIsDialogOpen(false);
    setCurrentService(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (currentService) {
        if (id === 'highlights') {
            setCurrentService({ ...currentService, highlights: value.split(',').map(s => s.trim()) });
        } else {
            setCurrentService({ ...currentService, [id]: value });
        }
    }
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </header>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
                <CardTitle>Manage Services</CardTitle>
                <CardDescription>Add, edit, or delete website services.</CardDescription>
            </div>
            <Button onClick={handleAddNew}>Add New Service</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Short Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.shortDescription}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(service)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentService?.id ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          {currentService && (
            <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={currentService.title} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={currentService.slug} onChange={handleInputChange} placeholder="e.g., website-development" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input id="shortDescription" value={currentService.shortDescription} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea id="description" value={currentService.description} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" value={currentService.price} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="highlights">Highlights (comma-separated)</Label>
                <Textarea id="highlights" value={currentService.highlights.join(', ')} onChange={handleInputChange} required />
              </div>
              <Button type="submit" className="w-full">Save Service</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone. This will permanently delete the service "{serviceToDelete?.title}".</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteAlertOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
