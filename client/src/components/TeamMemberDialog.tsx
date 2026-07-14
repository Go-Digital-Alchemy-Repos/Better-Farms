import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const placeholderBio = [
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
];

export interface TeamMember {
  image: string;
  name: string;
  credential: string;
  bio: string[];
}

interface TeamMemberDialogProps {
  member: TeamMember | null;
  onClose: () => void;
}

export const TeamMemberDialog = ({ member, onClose }: TeamMemberDialogProps) => {
  return (
    <Dialog open={member !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-[720px] overflow-y-auto rounded-2xl bg-white p-8 md:p-10">
        {member && (
          <div>
            <img
              className="h-[280px] w-[280px] max-w-full rounded-2xl object-cover grayscale"
              alt={member.name}
              src={member.image}
              data-testid="img-team-modal-headshot"
            />
            <DialogTitle
              className="mt-6 text-[36px] font-bold leading-[1.1] text-[#5e4540] md:text-[44px]"
              data-testid="text-team-modal-name"
            >
              {member.name}
            </DialogTitle>
            <p
              className="mt-3 [font-family:'Inter',Helvetica] text-base font-bold text-[#5e4540]"
              data-testid="text-team-modal-title"
            >
              {member.credential}
            </p>
            <DialogDescription asChild>
              <div className="mt-5 space-y-5">
                {member.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="[font-family:'Inter',Helvetica] text-base leading-7 text-[#5e4540]"
                    data-testid={`text-team-modal-bio-${index}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
