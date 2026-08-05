import { supabase } from "@/lib/supabase";
import InvitationClient from "./InvitationClient";
import { notFound } from "next/navigation";

export default async function InvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  if (!resolvedParams.id) {
    notFound();
  }

  const { data: guest, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !guest) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
        <div>
          <h1 className="text-4xl font-serif text-olive mb-4">Invitación no encontrada</h1>
          <p className="text-foreground/70">Lo sentimos, no pudimos encontrar tu invitación. Por favor revisa el enlace proporcionado por los novios.</p>
        </div>
      </div>
    );
  }

  return <InvitationClient guest={guest} />;
}
