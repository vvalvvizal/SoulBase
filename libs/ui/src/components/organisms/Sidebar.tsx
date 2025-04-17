import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { IconX } from '@tabler/icons-react';

export interface ISidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  blur: boolean;
}

export const Sidebar = ({
  open,
  setOpen,
  children,
  blur = true,
}: ISidebarProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={() => setOpen(false)}
      >
        {blur && (
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          </TransitionChild>
        )}

        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-300 sm:duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300 sm:duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="flex flex-col w-full max-w-sm h-full bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="text-lg font-semibold">Menu</div>
                <button
                  className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <IconX size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-auto">{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
