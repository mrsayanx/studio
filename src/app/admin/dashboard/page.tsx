
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Service, PricingPlan, initialServices, initialPricingPlans } from "@/lib/services";
import { Trash2, Edit, PlusCircle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LOCAL_STORAGE_KEYS = {
    SERVICES: 'tekitto_services',
    PRICING: 'tekitto_pricing_plans',
};

// Helper to get data from localStorage or return initial data
function getFromLocalStorage<T>(key: string, initialData: T): T {
    if (typeof window === 'undefined') return initialData;
    const stored = localStorage.getItem(key);
    try {
        return stored ? JSON.parse(stored) : initialData;
    } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return initialData;
    }
}

// Helper to set data to localStorage
function setToLocalStorage<T>(key: string, data: T) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
}


export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Service | null>(null);

  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PricingPlan | null>(null);
  

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }
    
    function loadData() {
        setIsLoading(true);
        const servicesData = getFromLocalStorage(LOCAL_STORAGE_KEYS.SERVICES, initialServices.map((s,i) => ({...s, id: `service_${i}`})));
        const pricingData = getFromLocalStorage(LOCAL_STORAGE_KEYS.PRICING, initialPricingPlans);
        setServices(servicesData.sort((a: Service, b: Service) => a.title.localeCompare(b.title)));
        setPricingPlans(pricingData.sort((a: PricingPlan, b: PricingPlan) => a.id === 'basic' ? -1 : 1));
        setIsLoading(false);
    }

    loadData();

  }, [router]);
  
  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    router.push('/admin');
  };

  // --- Service Management ---
  const handleAddNewService = () => {
    setCurrentService({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      price: '',
      highlights: [],
      Icon: 'Code',
    });
    setIsServiceDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsServiceDialogOpen(true);
  };
  
  const handleDeleteServiceClick = (service: Service) => {
    setItemToDelete(service);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete && itemToDelete.id) {
        const updatedServices = services.filter(s => s.id !== itemToDelete.id);
        setServices(updatedServices);
        setToLocalStorage(LOCAL_STORAGE_KEYS.SERVICES, updatedServices);
        toast({ title: "Service Deleted", description: `"${itemToDelete.title}" has been removed.` });
    }
    setIsDeleteAlertOpen(false);
    setItemToDelete(null);
  };

  const handleServiceFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService) return;

    let updatedServices;
    if (currentService.id) { // Editing existing service
        updatedServices = services.map(s => s.id === currentService.id ? currentService as Service : s);
        toast({ title: "Service Updated", description: `"${currentService.title}" has been updated.` });
    } else { // Adding new service
        const newService = { ...currentService, id: `service_${Date.now()}` } as Service;
        updatedServices = [...services, newService];
        toast({ title: "Service Added", description: `"${currentService.title}" has been added.` });
    }
    
    setServices(updatedServices.sort((a,b) => a.title.localeCompare(b.title)));
    setToLocalStorage(LOCAL_STORAGE_KEYS.SERVICES, updatedServices);
    
    setIsServiceDialogOpen(false);
    setCurrentService(null);
  };

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (currentService) {
        const updatedService = { ...currentService };
        if (id === 'highlights') {
            updatedService.highlights = value.split(',').map(s => s.trim());
        } else if (id === 'slug') {
            const slugValue = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            updatedService.slug = slugValue;
        } else {
            (updatedService as any)[id] = value;
        }
        setCurrentService(updatedService);
    }
  };

  // --- Pricing Plan Management ---
  const handleEditPlan = (plan: PricingPlan) => {
    setCurrentPlan(plan);
    setIsPricingDialogOpen(true);
  };

  const handlePlanFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPlan) {
        const updatedPlans = pricingPlans.map(p => p.id === currentPlan.id ? currentPlan : p);
        setPricingPlans(updatedPlans);
        setToLocalStorage(LOCAL_STORAGE_KEYS.PRICING, updatedPlans);
        toast({ title: "Pricing Plan Updated", description: `"${currentPlan.title}" has been updated.`});
    }
    setIsPricingDialogOpen(false);
    setCurrentPlan(null);
  };

  const handlePlanInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, value, type } = e.target;
    if (currentPlan) {
        const updatedPlan = { ...currentPlan };
        if (id === 'features') {
            updatedPlan.features = value.split(',').map(s => s.trim());
        } else if (type === 'checkbox') {
             (updatedPlan as any)[id] = (e.target as HTMLInputElement).checked;
        } else {
            (updatedPlan as any)[id] = value;
        }
        setCurrentPlan(updatedPlan);
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </header>
      
      {/* Services Management Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Services</CardTitle>
                <CardDescription>Add, edit, or delete your business services.</CardDescription>
            </div>
            <Button onClick={handleAddNewService}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Service
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{service.price}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteServiceClick(service)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Pricing Plans Management Card */}
      <Card>
        <CardHeader>
            <CardTitle>Manage Pricing Plans</CardTitle>
            <CardDescription>Update the details of the pricing plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-bold">{plan.title}</h3>
                    <p className="text-sm text-muted-foreground">{plan.price}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                    <Edit className="h-4 w-4 mr-2"/>
                    Edit Plan
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Service Delete Confirmation Dialog */}
       <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service "{itemToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteAlertOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Service Add/Edit Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentService?.id ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          {currentService && (
            <form onSubmit={handleServiceFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={currentService.title} onChange={handleServiceInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (auto-generated from title)</Label>
                <Input id="slug" value={currentService.slug} onChange={handleServiceInputChange} placeholder="e.g., website-development" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input id="shortDescription" value={currentService.shortDescription} onChange={handleServiceInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea id="description" value={currentService.description} onChange={handleServiceInputChange} required rows={4}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" value={currentService.price} onChange={handleServiceInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="highlights">Highlights (comma-separated)</Label>
                <Textarea id="highlights" value={currentService.highlights?.join(', ')} onChange={handleServiceInputChange} required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="Icon">Icon Name (from lucide-react, e.g., Code, Palette)</Label>
                <Input id="Icon" value={currentService.Icon as string} onChange={handleServiceInputChange} required />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsServiceDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Service</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Pricing Plan Edit Dialog */}
      <Dialog open={isPricingDialogOpen} onOpenChange={setIsPricingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pricing Plan: {currentPlan?.title}</DialogTitle>
          </DialogHeader>
          {currentPlan && (
            <form onSubmit={handlePlanFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
              <div className="space-y-2">
                <Label htmlFor="title">Plan Title</Label>
                <Input id="title" value={currentPlan.title} onChange={handlePlanInputChange} required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" value={currentPlan.price} onChange={handlePlanInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea id="features" value={currentPlan.features.join(', ')} onChange={handlePlanInputChange} required rows={5}/>
              </div>
               <div className="flex items-center space-x-2">
                <Input type="checkbox" id="isPopular" checked={currentPlan.isPopular} onChange={handlePlanInputChange} className="h-4 w-4"/>
                <Label htmlFor="isPopular">Is this the most popular plan?</Label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsPricingDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Plan</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
