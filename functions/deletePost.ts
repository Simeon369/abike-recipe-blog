import {supabase} from '../lib/supabase';

export default async function deletePost(id: string){
    const {data, error} = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

    if(error){
        console.log(error);
        
        return false;
    }
    console.log(data);
    
    return true;
}