'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useGetMiniPrizesQuery, useUpdateMiniPrizeMutation } from '@/Apis/users';

interface EditMiniPrizePageProps {
  params: { id: string };
}

export default function EditMiniPrizePage({ params }: EditMiniPrizePageProps) {
  const router = useRouter();
  const { data: miniPrizes, isLoading: isFetching, error } = useGetMiniPrizesQuery();
  const [updateMiniPrize, { isLoading: isUpdating }] = useUpdateMiniPrizeMutation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    stock: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const miniPrize = miniPrizes?.find((p) => p.id === parseInt(params.id));

  useEffect(() => {
    if (miniPrize) {
      setFormData({
        name: miniPrize.name,
        description: miniPrize.description,
        image_url: miniPrize.image_url,
        stock: miniPrize.stock,
      });
    }
  }, [miniPrize]);

  if (isFetching) return <div>Loading...</div>;
  if (error || !miniPrize) return <div>Error loading mini prize or prize not found.</div>;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.image_url) {
      newErrors.image_url = 'Image URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(formData.image_url)) {
      newErrors.image_url = 'Please enter a valid URL';
    }
    if (formData.stock < 0) newErrors.stock = 'Stock must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const loadingToast = toast.loading('Updating mini prize...');
    try {
      await updateMiniPrize({
        id: parseInt(params.id),
        body: {
          reward_item: {
            name: formData.name,
            description: formData.description,
            image_url: formData.image_url,
            stock: formData.stock,
          },
        },
      }).unwrap();
      toast.dismiss(loadingToast);
      toast.success('Mini prize updated successfully!');
      router.push('/dashboard/miniprize');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to update mini prize. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Mini Prize</h2>
          <Link href="/dashboard/miniprize">
            <Button variant="ghost" size="sm">
              <IconArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter the name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="Enter the description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                type="url"
                placeholder="Enter the image URL"
                value={formData.image_url}
                onChange={handleInputChange}
                required
              />
              {errors.image_url && <p className="text-sm text-destructive">{errors.image_url}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="Enter the stock quantity"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                required
              />
              {errors.stock && <p className="text-sm text-destructive">{errors.stock}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Mini Prize'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}