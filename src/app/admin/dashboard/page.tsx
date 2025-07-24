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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { initialServices, Service, initialPricingPlans, PricingPlan, initialYouTubeVideos, YouTubeVideo, initialHomepageContent, HomepageContent } from "@/lib/services";
import { Trash2, Edit, Video, Home } from "lucide-react";

const SERVICES_STORAGE_KEY = 'tekitto_services';
const PRICING_STORAGE_KEY = 'tekitto_pricing_plans';
const YOUTUBE_STORAGE_KEY = 'tekitto_youtube_videos';
const HOMEPAGE_CONTENT_STORAGE_KEY = 'tekitto_homepage_content';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [services, setServices] = useState<Service[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(initialHomepageContent);
  
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PricingPlan | null>(null);
  
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  const [currentYoutubeVideo, setCurrentYoutubeVideo] = useState<YouTubeVideo | null>(null);

  const [isHomepageContentDialogOpen, setIsHomepageContentDialogOpen] = useState(false);
  const [currentHomepageContent, setCurrentHomepageContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      router.push('/admin');
    }

    const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (storedServices) setServices(JSON.parse(storedServices));
    else setServices(initialServices);
    
    const storedPricing = localStorage.getItem(PRICING_STORAGE_KEY);
    if(storedPricing) setPricingPlans(JSON.parse(storedPricing));
    else setPricingPlans(initialPricingPlans);

    const storedYoutube = localStorage.getItem(YOUTUBE_STORAGE_KEY);
    if (storedYoutube) setYoutubeVideos(JSON.parse(storedYoutube));
    else setYoutubeVideos(initialYouTubeVideos);

    const storedHomepageContent = localStorage.getItem(HOMEPAGE_CONTENT_STORAGE_KEY);
    if(storedHomepageContent) setHomepageContent(JSON.parse(storedHomepageContent));
    else setHomepageContent(initialHomepageContent);

  }, [router]);

  useEffect(() => {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  useEffect(() => {
    localStorage.setItem(YOUTUBE_STORAGE_KEY, JSON.stringify(youtubeVideos));
  }, [youtubeVideos]);
  
  useEffect(() => {
    localStorage.setItem(HOMEPAGE_CONTENT_STORAGE_KEY, JSON.stringify(homepageContent));
  }, [homepageContent]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    router.push('/admin');
  };

  // --- Service Management ---
  const handleAddNewService = () => {
    setCurrentService({
      id: Math.max(0, ...services.map(s => s.id)) + 1,
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      price: '',
      highlights: [],
      Icon: 'Code' as any,
    });
    setIsServiceDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsServiceDialogOpen(true);
  };
  
  const handleDeleteServiceClick = (service: Service) => {
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

  const handleServiceFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentService) {
        const isNew = !services.some(s => s.id === currentService.id);
        if (isNew) {
            setServices([...services, currentService]);
            toast({ title: "Service Added", description: `"${currentService.title}" has been added.` });
        } else {
            setServices(services.map(s => s.id === currentService.id ? currentService : s));
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
        setPricingPlans(pricingPlans.map(p => p.id === currentPlan.id ? currentPlan : p));
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
        setYoutubeVideos(youtubeVideos.map(v => v.id === currentYoutubeVideo.id ? currentYoutubeVideo : v));
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

  // --- Homepage Content Management ---
  const handleEditHomepageContent = () => {
    setCurrentHomepageContent(homepageContent);
    setIsHomepageContentDialogOpen(true);
  };

  const handleHomepageContentFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentHomepageContent) {
      setHomepageContent(currentHomepageContent);
      toast({ title: "Homepage Content Updated" });
    }
    setIsHomepageContentDialogOpen(false);
    setCurrentHomepageContent(null);
  };

  const handleHomepageContentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (currentHomepageContent) {
      setCurrentHomepageContent({ ...currentHomepageContent, [id]: value });
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </header>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
                <CardTitle>Manage Services</CardTitle>
                <CardDescription>Add, edit, or delete website services.</CardDescription>
            </div>
            <Button onClick={handleAddNewService}>Add New Service</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Short Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{service.shortDescription}</TableCell>
                  <TableCell>{service.price}</TableCell>
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
      
      <div className="grid md:grid-cols-2 gap-8">
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

        <Card>
          <CardHeader>
            <CardTitle>Manage Homepage Content</CardTitle>
            <CardDescription>Edit text on the main page.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className='flex items-center gap-4'>
                  <Home className="h-6 w-6 text-muted-foreground" />
                  <div>
                      <h3 className="font-bold">Page Texts</h3>
                      <p className="text-sm text-muted-foreground">Video section titles, etc.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleEditHomepageContent}>
                    <Edit className="h-4 w-4 mr-2"/>
                    Edit Content
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader>
            <CardTitle>Manage YouTube Videos</CardTitle>
            <CardDescription>Update the videos featured on the homepage.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
             {youtubeVideos.map((video) => (
               <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                 <div className="flex items-center gap-4">
                    <Video className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <h3 className="font-bold">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">Video ID: {video.videoId}</p>
                    </div>
                 </div>
                 <Button variant="outline" size="sm" onClick={() => handleEditYoutubeVideo(video)}>
                    <Edit className="h-4 w-4 mr-2"/>
                    Edit Video
                 </Button>
               </div>
             ))}
           </div>
        </CardContent>
      </Card>

      {/* Service Edit/Add Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentService?.id && services.some(s => s.id === currentService.id) ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          {currentService && (
            <form onSubmit={handleServiceFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={currentService.title} onChange={handleServiceInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
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
                <Label htmlFor="Icon">Icon Name (e.g., Code, Palette)</Label>
                <Input id="Icon" value={currentService.Icon as string} onChange={handleServiceInputChange} required />
              </div>
              <Button type="submit" className="w-full">Save Service</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Pricing Plan Edit Dialog */}
      <Dialog open={isPricingDialogOpen} onOpenChange={setIsPricingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit: {currentPlan?.title}</DialogTitle>
          </DialogHeader>
          {currentPlan && (
            <form onSubmit={handlePlanFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
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
              <Button type="submit" className="w-full">Save Plan</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* YouTube Video Edit Dialog */}
      <Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit: {currentYoutubeVideo?.title}</DialogTitle>
          </DialogHeader>
          {currentYoutubeVideo && (
            <form onSubmit={handleYoutubeFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
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
              <Button type="submit" className="w-full">Save Video</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Homepage Content Edit Dialog */}
      <Dialog open={isHomepageContentDialogOpen} onOpenChange={setIsHomepageContentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Homepage Content</DialogTitle>
          </DialogHeader>
          {currentHomepageContent && (
            <form onSubmit={handleHomepageContentFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
              <div className="space-y-2">
                <Label htmlFor="videoSectionTitle">Video Section Title</Label>
                <Input id="videoSectionTitle" value={currentHomepageContent.videoSectionTitle} onChange={handleHomepageContentInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoSectionDescription">Video Section Description</Label>
                <Textarea id="videoSectionDescription" value={currentHomepageContent.videoSectionDescription} onChange={handleHomepageContentInputChange} required rows={3}/>
              </div>
              <Button type="submit" className="w-full">Save Content</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>


      {/* Delete Confirmation Dialog */}
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
