import { memo } from "react";
import MenuItemCard from "./MenuItemCard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useQuery } from "@tanstack/react-query";
import { MenuItemInterFace } from "../../../utilities/interfaces/interface";
import MenuItemsCardSkeleton from "./MenuItemsCardSkeleton";
const MenuSection: React.FC = () => {
    let vegItems: MenuItemInterFace[] = []
    let non_vegItems: MenuItemInterFace[] = []
    const apiUrl = import.meta.env.VITE_BACKEND_BASE_URL + "/user/menu";
    const { data, isLoading, error } = useQuery<MenuItemInterFace[]>({
        queryKey: ['menuItems'],
        queryFn: async () => {
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            })
            return res.json();
        }
    });

    if (!isLoading && !error && data) {
        vegItems = data.filter((menuItem) => menuItem.type === "veg")
        non_vegItems = data.filter((menuItem) => menuItem.type === "non-veg")
    }

    return (
        <section id="menu_section" className="text_light menu_section pb-4 pt-4 container px-sm-0 px-2  ">
            <h3 className="our_menu_title  text-center fs-2 fw-normal">
                <span className="pb-1 border border-4 border-warning px-5 border-top-0 border-start-0 border-end-0 border-bottom-warning">
                    Our Menu
                </span>
            </h3>
            <div className="row w-100 m-0 p-0 mt-md-4 mt-5">
                <Tabs
                    defaultActiveKey="all"
                    className=" justify-content-around text-white "
                    justify
                >
                    <Tab eventKey="all" title="All">
                        <div className="row py-3 d-flex justify-content-center ">
                            {
                                data ?
                                    data.map((menuItem: MenuItemInterFace) => <MenuItemCard stock={menuItem.stock} key={menuItem._id} _id={menuItem._id} description={menuItem.description} pizzaName={menuItem.pizzaName} price={menuItem.price} size={menuItem.size} type={menuItem.type} />)
                                    : <div className="row col-12 p-0 m-0 d-flex justify-content-center">
                                        <MenuItemsCardSkeleton />
                                        <MenuItemsCardSkeleton />
                                    </div>
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="veg" title="Veg">
                        <div className="row py-3 d-flex justify-content-center ">
                            {
                                vegItems.length ?
                                    vegItems.map((menuItem: MenuItemInterFace) => {
                                        if (menuItem.type === "veg") {
                                            return (<MenuItemCard stock={menuItem.stock} _id={menuItem._id} key={menuItem._id} description={menuItem.description} pizzaName={menuItem.pizzaName} price={menuItem.price} size={menuItem.size} type={menuItem.type} />)
                                        }
                                    })
                                    : <div className="row p-0 m-0 col-12 d-flex justify-content-center">
                                        <MenuItemsCardSkeleton />
                                        <MenuItemsCardSkeleton />
                                    </div>
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="nonVeg" title="Non-Veg">
                        <div className="row py-3 d-flex justify-content-center ">
                            {
                                non_vegItems.length ?
                                    non_vegItems.map((menuItem: MenuItemInterFace) => {
                                        if (menuItem.type === "non-veg") {
                                            return (<MenuItemCard stock={menuItem.stock} _id={menuItem._id} key={menuItem._id} description={menuItem.description} pizzaName={menuItem.pizzaName} price={menuItem.price} size={menuItem.size} type={menuItem.type} />)
                                        }
                                    })
                                    : <div className="row col-12 p-0 m-0 d-flex justify-content-center">
                                        <MenuItemsCardSkeleton />
                                        <MenuItemsCardSkeleton />
                                    </div>
                            }
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
};

export default memo(MenuSection);
