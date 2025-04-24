"use client";

import { Button } from "@/components/ui/Button";
import { DialogClose, DialogFooter } from "@/components/ui/Dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { forwardFnDropAsync } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	filename: z.string({ message: "Enter a valid filename" }).nonempty("Enter a valid filename"),
});

export function FilenameInputDialog({ resolve }: { resolve: (v: string) => void }): React.ReactNode {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			filename: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		resolve(values.filename);
	}
	return (
		<Form {...form}>
			<form onSubmit={forwardFnDropAsync(form.handleSubmit(onSubmit))} className="pb-4 px-2">
				<FormField
					control={form.control}
					name="filename"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} type="text" />
							</FormControl>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>
				<DialogFooter className="sm:justify-start mt-1 flex flex-row gap-1">
					<Button variant="default" type="submit">
						OK
					</Button>
					<DialogClose asChild>
						<Button type="button" variant="destructive">
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	);
}
