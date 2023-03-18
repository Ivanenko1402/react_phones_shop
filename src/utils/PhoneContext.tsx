import React, { useEffect, useState } from 'react';
import { Phone } from '../types/Phone';
import { getPhones } from './getDevicesFromApi';
import { useLocalStorage } from './useLocalStorage';

type ContextProps = {
  phoneList: Phone[],
  bagPhones: Phone[],
  addToBag: (phone: Phone) => void,
  removeInBag: (id:string) => void,
  favPhones: Phone[],
  addAndRemove: (phone: Phone) => void,
  showNotif: boolean,
  setShowNotif: (val: boolean) => void,
};

export const PhoneContext = React.createContext<ContextProps>({
  bagPhones: [],
  addToBag: () => {},
  removeInBag: () => {},
  favPhones: [],
  addAndRemove: () => {},
  showNotif: false,
  setShowNotif: () => {},
  phoneList: [],
});

type Props = {
  children: React.ReactNode
};

export const PhoneProvider: React.FC<Props> = ({ children }) => {
  const [phoneList, setPhoneList] = useState<Phone[]>([]);

  const fetchProducts = async () => {
    const res = await getPhones();

    setPhoneList(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [phoneInBag, setPhoneInBag] = useLocalStorage<Phone[]>('bag', []);
  const [bagPhones, setBagPhones] = useState<Phone[]>(phoneInBag);

  useEffect(() => {
    setPhoneInBag(bagPhones);
  }, [bagPhones]);

  const addToBag = (targPhone: Phone) => {
    const newPhone = {
      ...targPhone,
      count: 1,
    };

    setBagPhones(prev => [...prev, newPhone]);
  };

  const removeInBag = (id: string) => {
    setBagPhones(
      prev => prev.filter(item => item.phoneId !== id),
    );
  };

  const [favorites, setFavorites] = useLocalStorage<Phone[]>('favorites', []);
  const [favPhones, setFavPhones] = useState<Phone[]>(favorites);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    setFavorites(favPhones);
  }, [favPhones]);

  const addAndRemove = (targPhone: Phone) => {
    return favorites.some(item => item.phoneId === targPhone.phoneId)
      ? setFavPhones(
        prev => prev.filter(dev => dev.phoneId !== targPhone.phoneId),
      )
      : setFavPhones(prev => [...prev, targPhone]);
  };

  const contextValue = {
    phoneList,
    bagPhones,
    addToBag,
    removeInBag,
    favPhones,
    addAndRemove,
    showNotif,
    setShowNotif,
  };

  return (
    <PhoneContext.Provider value={contextValue}>
      {children}
    </PhoneContext.Provider>
  );
};
