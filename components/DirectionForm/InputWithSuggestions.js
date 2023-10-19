'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

const languages = [
	{ label: 'English', value: 'en' },
	{ label: 'French', value: 'fr' },
	{ label: 'German', value: 'de' },
	{ label: 'Spanish', value: 'es' },
	{ label: 'Portuguese', value: 'pt' },
	{ label: 'Russian', value: 'ru' },
	{ label: 'Japanese', value: 'ja' },
	{ label: 'Korean', value: 'ko' },
	{ label: 'Chinese', value: 'zh' },
];

export function InputWithSuggestions({ field, form, name }) {
	const [open, setOpen] = useState(false);
	return (
		<FormItem className='flex flex-col'>
			<FormLabel>Ingrese su dirección</FormLabel>
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant='outline'
							role='combobox'
							className={cn(
								' justify-between',
								!field.value && 'text-muted-foreground'
							)}>
							{field.value
								? languages.find((language) => language.value === field.value)
										?.label
								: 'Select language'}
							<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0'>
					<Command>
						<CommandInput placeholder='Ingrese su dirección' className='h-9' />
						<CommandEmpty>No se encuentra una dirección valida</CommandEmpty>
						<CommandGroup>
							{languages.map((language) => (
								<CommandItem
									value={language.label}
									key={language.value}
									onSelect={() => {
										form.setValue(name, language.value);
										setOpen(false);
									}}>
									{language.label}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4',
											language.value === field.value
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			<FormDescription>
				This is the language that will be used in the dashboard.
			</FormDescription>
			<FormMessage />
		</FormItem>
	);
}
