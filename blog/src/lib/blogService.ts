import { getSupabaseClient } from './firebase';
import { BlogPost } from './types';

const POSTS_TABLE = 'posts';
const STORAGE_BUCKET = 'blog-images';

function getSupabase() {
  return getSupabaseClient();
}

// Create a new blog post
export const createPost = async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
  const timestamp = new Date().toISOString();
  const supabase = getSupabase();
  
  try {
    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .insert([
        {
          title: postData.title,
          slug: postData.slug,
          excerpt: postData.excerpt,
          content: postData.content,
          author: postData.author,
          category: postData.category,
          image_url: postData.imageUrl,
          published: postData.published,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(`Failed to create post: ${error.message}`);
    }
    return data.id;
  } catch (err) {
    console.error('Create post error:', err);
    throw err;
  }
};

// Update blog post
export const updatePost = async (postId: string, updates: Partial<BlogPost>) => {
  const supabase = getSupabase();
  const { error } = await supabase
    .from(POSTS_TABLE)
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', postId);

  if (error) throw error;
};

// Delete blog post
export const deletePost = async (postId: string) => {
  const supabase = getSupabase();
  const { error } = await supabase
    .from(POSTS_TABLE)
    .delete()
    .eq('id', postId);

  if (error) throw error;
};

// Get all published posts
export const getPublishedPosts = async () => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(post => ({
    ...post,
    createdAt: new Date(post.created_at),
    updatedAt: new Date(post.updated_at),
    imageUrl: post.image_url,
  })) as BlogPost[];
};

// Get post by slug
export const getPostBySlug = async (slug: string) => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  if (!data) return null;

  return {
    ...data,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    imageUrl: data.image_url,
  } as BlogPost;
};

// Get all posts (including unpublished)
export const getAllPosts = async () => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(post => ({
    ...post,
    createdAt: new Date(post.created_at),
    updatedAt: new Date(post.updated_at),
    imageUrl: post.image_url,
  })) as BlogPost[];
};

// Get single post by ID
export const getPostById = async (postId: string) => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .eq('id', postId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  if (!data) return null;

  return {
    ...data,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    imageUrl: data.image_url,
  } as BlogPost;
};

// Upload image to Supabase Storage
export const uploadImage = async (file: File, path: string = 'blog-images') => {
  const filename = `${Date.now()}-${file.name}`;
  const filePath = `${path}/${filename}`;
  const supabase = getSupabase();

  try {
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file);

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error('Upload image error:', err);
    throw err;
  }
};

// Delete image from Supabase Storage
export const deleteImage = async (imageUrl: string) => {
  try {
    const supabase = getSupabase();
    // Extract path from public URL
    const urlParts = imageUrl.split('/');
    const pathIndex = urlParts.findIndex(part => part === STORAGE_BUCKET) + 1;
    const filePath = urlParts.slice(pathIndex).join('/');

    if (filePath) {
      await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([filePath]);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};
