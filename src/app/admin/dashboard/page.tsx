
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
import { initialServices, Service, initialPricingPlans, PricingPlan, initialYouTubeVideos, YouTubeVideo } from "@/lib/services";
import { Trash2, Edit, Video, PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const SERVICES_STORAGE_KEY = 'tekitto_services';
const PRICING_STORAGE_KEY = 'tekitto_pricing_plans';
const YOUTUBE_STORAGE_KEY = 'tekitto_youtube_videos';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [services, setServices] = useState<Service[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Service | null>(null);

  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PricingPlan | null>(null);
  
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  const [currentYoutubeVideo, setCurrentYoutubeVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    try {
        const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
        setServices(storedServices && storedServices !== '[]' ? JSON.parse(storedServices) : initialServices);
        
        const storedPricing = localStorage.getItem(PRICING_STORAGE_KEY);
        setPricingPlans(storedPricing && storedPricing !== '[]' ? JSON.parse(storedPricing) : initialPricingPlans);

        const storedYoutube = localStorage.getItem(YOUTUBE_STORAGE_KEY);
        setYoutubeVideos(storedYoutube && storedYoutube !== '[]' ? JSON.parse(storedYoutube) : initialYouTubeVideos);

    } catch (error) {
        console.error("Failed to parse from localStorage", error);
        toast({
            variant: "destructive",
            title: "Error loading data",
            description: "Could not load data from local storage. Using initial data."
        });
        setServices(initialServices);
        setPricingPlans(initialPricingPlans);
        setYoutubeVideos(initialYouTubeVideos);
    }
  }, [router, toast]);

  useEffect(() => {
    // Prevent writing empty initial array back to storage on first load
    if (services.length > 0) {
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    }
  }, [services]);

  useEffect(() => {
     if (pricingPlans.length > 0) {
      localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(pricingPlans));
    }
  }, [pricingPlans]);

  useEffect(() => {
     if (youtubeVideos.length > 0) {
      localStorage.setItem(YOUTUBE_STORAGE_KEY, JSON.stringify(youtubeVideos));
    }
  }, [youtubeVideos]);
  
  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    router.push('/admin');
  };

  // --- Service Management ---
  const handleAddNewService = () => {
    setCurrentService({
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
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
  
  const handleDeleteService = (service: Service) => {
    setItemToDelete(service);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setServices(prevServices => prevServices.filter(s => s.id !== itemToDelete.id));
      toast({ title: "Service Deleted", description: `"${itemToDelete.title}" has been removed.` });
    }
    setIsDeleteAlertOpen(false);
    setItemToDelete(null);
  };

  const handleServiceFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentService) {
        const isNew = !services.some(s => s.id === currentService.id);
        if (isNew) {
            setServices(prev => [...prev, currentService]);
            toast({ title: "Service Added", description: `"${currentService.title}" has been added.` });
        } else {
            setServices(prev => prev.map(s => s.id === currentService.id ? currentService : s));
            toast({ title: "Service Updated", description: `"${currentService.title}" has been updated.` });
        }
    }
    setIsServiceDialogOpen(false);
    setCurrentService(null);
  };

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (currentService) {
        if (id === 'highlights') {
            setCurrentService({ ...currentService, highlights: value.split(',').map(s => s.trim()) });
        } else if (id === 'slug') {
            const slugValue = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setCurrentService({ ...currentService, [id]: slugValue });
        } else {
            setCurrentService({ ...currentService, [id]: value });
        }
    }
  };

  // --- Pricing Plan Management ---
  const handleEditPlan = (plan: PricingPlan) => {
    setCurrentPlan(plan);
    setIsPricingDialogOpen(true);
  };

  const handlePlanFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPlan) {
        setPricingPlans(prev => prev.map(p => p.id === currentPlan.id ? currentPlan : p));
        toast({ title: "Pricing Plan Updated", description: `"${currentPlan.title}" has been updated.`});
    }
    setIsPricingDialogOpen(false);
    setCurrentPlan(null);
  };

  const handlePlanInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (currentPlan) {
        if (id === 'features') {
            setCurrentPlan({ ...currentPlan, features: value.split(',').map(s => s.trim()) });
        } else {
            setCurrentPlan({ ...currentPlan, [id]: value });
        }
    }
  };

  // --- YouTube Video Management ---
  const handleEditYoutubeVideo = (video: YouTubeVideo) => {
    setCurrentYoutubeVideo(video);
    setIsYoutubeDialogOpen(true);
  };

  const handleYoutubeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentYoutubeVideo) {
        setYoutubeVideos(prev => prev.map(v => v.id === currentYoutubeVideo.id ? currentYoutubeVideo : v));
        toast({ title: "YouTube Video Updated", description: `"${currentYoutubeVideo.title}" has been updated.`});
    }
    setIsYoutubeDialogOpen(false);
    setCurrentYoutubeVideo(null);
  };
  
  const handleYoutubeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (currentYoutubeVideo) {
        setCurrentYoutubeVideo({ ...currentYoutubeVideo, [id]: value });
    }
  };

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
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
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

        {/* YouTube Videos Management Card */}
        <Card>
          <CardHeader>
              <CardTitle>Manage YouTube Videos</CardTitle>
              <CardDescription>Update the videos featured on the homepage.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {youtubeVideos.map((video) => (
                 <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                   <div className="flex items-center gap-4 overflow-hidden">
                      <Video className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                      <div className="flex-grow overflow-hidden">
                          <h3 className="font-bold truncate">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">ID: {video.videoId}</p>
                      </div>
                   </div>
                   <Button variant="outline" size="sm" onClick={() => handleEditYoutubeVideo(video)}>
                      <Edit className="h-4 w-4 mr-2"/>
                      Edit
                   </Button>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Add/Edit Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentService && services.some(s => s.id === currentService.id) ? 'Edit Service' : 'Add New Service'}</DialogTitle>
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
                <Textarea id="highlights" value={currentService.highlights.join(', ')} onChange={handleServiceInputChange} required />
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
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsPricingDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Plan</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* YouTube Video Edit Dialog */}
      <Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit YouTube Video: {currentYoutubeVideo?.title}</DialogTitle>
          </DialogHeader>
          {currentYoutubeVideo && (
            <form onSubmit={handleYoutubeFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input id="title" value={currentYoutubeVideo.title} onChange={handleYoutubeInputChange} required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="videoId">YouTube Video ID</Label>
                <Input id="videoId" value={currentYoutubeVideo.videoId} onChange={handleYoutubeInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Video Description</Label>
                <Textarea id="description" value={currentYoutubeVideo.description} onChange={handleYoutubeInputChange} required rows={5}/>
              </div>
              <DialogFooter>
                 <Button type="button" variant="outline" onClick={() => setIsYoutubeDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Video</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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

    </div>
  );
}
