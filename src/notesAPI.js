import { supabase } from './supabaseClient'

export async function getNotes() {
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: true })
    if (error) throw error
    return data
}

export async function createNote(note) {
    const { data, error } = await supabase
        .from('notes')
        .insert(note)
        .select()
        .single()
    if (error) throw error
    return data
}

export async function updateNote(id, updates) {
    const { error } = await supabase.from('notes').update(updates).eq('id', id)
    if (error) throw error
}

export async function deleteNote(id) {
    const { error } = await supabase.from('notes').delete().eq('id', id)
    if (error) throw error
}