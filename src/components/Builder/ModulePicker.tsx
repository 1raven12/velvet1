import { modernSetting, rockstarArchetype, childhoodBullyTrope } from '../../modules';

type PickerKind = 'setting' | 'archetype' | 'trope';

type Props = {
  kind: PickerKind;
};

export function ModulePicker({ kind }: Props) {
  // For the vertical slice each picker has one available option.
  // The UI still presents it as a selection so the pattern is established.
  const config = {
    setting: {
      heading: 'Choose the world',
      subheading: 'When and where does the story take place?',
      label: modernSetting.label,
      description: 'Present day. Smartphones, social media, public reputations, blurred lines between private and public life.',
    },
    archetype: {
      heading: 'Choose his world',
      subheading: 'What does he do?',
      label: rockstarArchetype.label,
      description: 'A famous musician at the centre of a fanbase. Tours, interviews, paparazzi, ritual onstage and chaos off it.',
    },
    trope: {
      heading: 'Choose your history',
      subheading: 'What is between you?',
      label: childhoodBullyTrope.label,
      description: 'He bullied you in school, then disappeared into fame. Years later you meet again, both adults.',
    },
  }[kind];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <p className="text-sm text-stone-400 uppercase tracking-widest mb-2">{config.subheading}</p>
        <h2 className="font-serif text-3xl text-stone-100 leading-tight">{config.heading}</h2>
      </div>

      <div className="border border-stone-100/30 bg-stone-100/5 rounded-md px-5 py-4">
        <p className="font-serif text-xl text-stone-50 mb-2">{config.label}</p>
        <p className="text-sm text-stone-300 leading-relaxed">{config.description}</p>
      </div>

      <p className="text-xs text-stone-500">
        More options unlock as new modules ship.
      </p>
    </div>
  );
}
