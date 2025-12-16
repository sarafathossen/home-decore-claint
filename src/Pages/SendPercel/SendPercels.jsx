import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';


const SendPercels = () => {
    const { register, handleSubmit, control,
        //  formState: { errors } 
    } = useForm()
    const { user } = useAuth()
    // console.log(user)
    const axciosSecure = useAxiosSecure()
    const serviceCenter = useLoaderData()
    const navigate = useNavigate()

    const regionsDuplicates = serviceCenter.map(c => c.region)
    const regions = [...new Set(regionsDuplicates)]
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const reciverRegion = useWatch({ control, name: 'reciverRegion' })
    const districtByRegion = region => {
        const regionDistricts = serviceCenter.filter(c => c.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }
    // console.log(regions)
    const handelSendPercel = data => {
        const isDocument = data.parcelType === 'document'
        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        const parcelWeight = parseFloat(data.parcelWeight)

        let cost = 0
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150
            } else {
                const minimumCharg = isSameDistrict ? 110 : 150
                const extraWeight = parcelWeight - 3
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minimumCharg + extraCharge
            }
        }
        // console.log('Cost  : ', cost)
        data.cost = cost

        Swal.fire({
            title: "Agree with the cost",
            text: `You will be Charged ${cost} Taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and continue payment"
        }).then((result) => {
            if (result.isConfirmed) {
                axciosSecure.post('/parcels', data)
                    .then(res => {
                        // console.log('after seving parcels', res.data)
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Parcel has created. Please Pay",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })

                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }
    return (
        <div>
            <h2 className='text-5xl font-bold' >Send A Percel</h2>
            <form onSubmit={handleSubmit(handelSendPercel)} className='mt-12 p-4 text-black'>
                <div className="">
                    <label className='label'>
                        <input type="radio" value="document" {...register('percelType')} className="radio" defaultChecked />
                        Document
                    </label>
                    <label className='label'>
                        <input type="radio" value="non-document" {...register('percelType')} className="radio" />
                        Non Document
                    </label>
                </div>
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                        <fieldset className="fieldset">
                            <label className="label">Percel Name</label>
                            <input type="text" className="input w-full" {...register('parcelName')} placeholder="Write a percel name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Percel Weight (Kg) </label>
                            <input type="number" className="input w-full" {...register('parcelWeight')} placeholder="Write Weight" />
                        </fieldset>
                    </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-10">
                    <fieldset className="fieldset">
                        <h4 className='text-xl font-semibold '>Sender Details</h4>
                        {/* Sender Name  */}
                        <label className="label">Sender Name</label>
                        <input type="text" className="input w-full" defaultValue={user?.displayName} {...register('senderName')} placeholder="Sender name" />
                        {/* Sender Email  */}
                        <label className="label">Sender Email</label>
                        <input type="email" className="input w-full" defaultValue={user?.email} {...register('senderEmail')} placeholder="Sender Email" />
                        {/* Sender Region +-6 */}
                        <fieldset className="fieldset w-full ">
                            <legend className="fieldset-legend">Division</legend>
                            <select {...register('senderRegion')} defaultValue="Select Division" className="select">
                                <option disabled={true}>Select Division</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>
                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* Sender Mobile  */}
                        <label className="label mt-4">Sender Phone Number</label>
                        <input type="number" className="input w-full " {...register('senderNumber')} placeholder="Sender Phone Number" />
                    </fieldset>

                    {/* Reciver Details  */}
                    <fieldset className="fieldset">
                        <h4 className='text-xl font-semibold '>Reciver Details</h4>
                        {/* Reciver Name  */}
                        <label className="label">Reciver Name</label>
                        <input type="text" className="input w-full" {...register('reciverName')} placeholder="Reciver name" />
                        {/* Reciver Email  */}
                        <label className="label">Reciver Email</label>
                        <input type="email" className="input w-full" {...register('reciverEmail')} placeholder="Reciver Email" />
                        {/* Receiver Region +-6 */}
                        <fieldset className="fieldset w-full ">
                            <legend className="fieldset-legend">Receiver Division</legend>
                            <select {...register('reciverRegion')} defaultValue="Select Division" className="select">
                                <option disabled={true}>Select Division</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>
                        {/* Receiver District +-6 */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver District</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(reciverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Sender Mobile  */}
                        <label className="label mt-4">Reciver Phone Number</label>
                        <input type="number" className="input w-full " {...register('reciverNumber')} placeholder="Reciver Phone Number" />
                    </fieldset>
                </div>

                <input type="submit" className='btn btn-primary text-black' value="Send Percel" />
            </form>
        </div>
    );
};

export default SendPercels;