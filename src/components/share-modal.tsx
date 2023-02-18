import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { QRCodeCanvas } from "qrcode.react";

const ShareModal = ({
  url,
  code,
  isOpen,
  closeModal,
}: {
  url: string;
  code: string;
  isOpen: boolean;
  closeModal: () => void;
}) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center gap-8 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-4xl font-semibold leading-6 text-gray-900"
              >
                Join Talk Session
              </Dialog.Title>
              <QRCodeCanvas value={url} size={300} />
              <h4 className="text-xl font-semibold text-gray-900">{code}</h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex rounded bg-indigo-100 px-4 py-2 align-middle text-sm font-semibold text-indigo-900 hover:bg-indigo-200"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default ShareModal;
