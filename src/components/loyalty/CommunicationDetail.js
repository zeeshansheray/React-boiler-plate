
import CustomSwitch from '../CustomSwitch';
import CustomSelect from '../CustomSelect';

import SvgIcons from '../../icons/svg.icon'

export default function CommunicationDetail({formik}){

    const dummyOptions = () => {
        const options = ['a', 'b', 'c', 'd']
        return options.map(option => <option value={option}>{option}</option>)
    }
    

    return(
        <div className="communication col-12">
            <div className="headlineH4 color-neutral80 fw-6 fs-16">
                Keep your customer up to date 
            </div>
    
            <div className="Body14R mt_8">
                This Activity will trigger following communication.
            </div>
            <CommunicationChannel 
                Icon    = {SvgIcons.CommunicationNotificationIcon}
                text    = {'Notification'}
                label   = {'Select Notification'}
                options = {dummyOptions()}
                name    = {'notification'}
                enable  = {formik.values.communication.notification.active}
                value   = {formik.values.communication.notification.referenceId}
                formik  = {formik}
            />
            <CommunicationChannel 
                Icon    = {SvgIcons.CommunicationEmailIcon}
                text    = {'Email'}
                label   = {'Select Email'}
                options = {dummyOptions()}
                name    = {'email'}
                enable  = {formik.values.communication.email.active}
                value   = {formik.values.communication.email.referenceId}
                formik  = {formik}
            />
            <CommunicationChannel 
                Icon    = {SvgIcons.CommunicatonSmsIcon}
                text    = {'SMS'}
                label   = {'Select SMS'}
                options = {dummyOptions()}
                name    = {'sms'}
                enable  = {formik.values.communication.sms.active}
                value   = {formik.values.communication.sms.referenceId}
                formik  = {formik}
            />
            <CommunicationChannel 
                Icon    = {SvgIcons.CommunicationChatFlowIcon}
                text    = {'Chat Flow'}
                label   = {'Select Flow'}
                options = {dummyOptions()}
                name    = {'chatFlow'}
                enable  = {formik.values.communication.chatFlow.active}
                value   = {formik.values.communication.chatFlow.referenceId}
                formik  = {formik}
            />
        </div>
    )
}

const CommunicationChannel = ({Icon, text, label, options, enable, name, value, formik}) => {
    return (
        <div>
            <div className="col-5 pl_0 mt_36">
                <div className="d-flex">
                    <Icon />
                    <span className="ml_16 fw-5">{text}</span>
                    <div className="ml_auto w-fit-content">
                        <CustomSwitch 
                            checked  = {enable}
                            name     = {`communication.${name}.active`}
                            onChange = {formik.handleChange}
                        />
                    </div>
                </div>
                {enable &&
                    <div className="mt_10">
                        <CustomSelect 
                            options    = {options}
                            name       = {`communication.${name}.referenceId`}
                            label      = {label}
                            value      = {value}
                            onChange   = {formik.handleChange}
                            error      = {formik.errors.communication && formik.errors.communication[name] && formik.errors.communication[name].referenceId}
                            helperText = {formik.errors.communication && formik.errors.communication[name] && formik.errors.communication[name].referenceId}
                        />
                    </div>
                }
            </div>
        </div>
    )
}