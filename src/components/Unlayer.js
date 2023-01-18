import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Fields } from '../enums'
import { BrandContext } from '../context/Brand.context'
import { UserContext } from '../context/User.context'

let unlayer

function Unlayer({unlayerConfig, GetDesign, formEnable=false}) {

    const brand = useContext(BrandContext)
    const user = useContext(UserContext)

    const exportDesign = (data) => GetDesign({json: data.design, html: data.html})

    const getUpdatedMergeTags = () => {
      Object.values(Fields.MergeTags[Fields.FieldReference.BRAND].mergeTags).forEach(field => field.value = brand[field.key])
      Object.values(Fields.MergeTags[Fields.FieldReference.USER].mergeTags).forEach(field => field.value = user[field.key])
      return Fields.MergeTags
    }

    const onLoad = () => loadUnlayer()
    const loadUnlayer = () => {
        unlayer = window.unlayer

        const config = {
          id          : 'editor-container',
          projectId   : 1234,
          displayMode : unlayerConfig.displayMode,
          mergeTags   : unlayerConfig.mergeTags && getUpdatedMergeTags(),
          tools       : {form: {enable: formEnable, ...Fields.FormProperties}}
        }

        if(unlayerConfig.form) config.tools.form = Fields.FormProperties
      
        unlayer.init(config)

        unlayerConfig.design && unlayer.loadDesign(unlayerConfig.design )

        const designUpdates = (updates) => unlayer.exportHtml(exportDesign)

        unlayer.addEventListener('design:updated', designUpdates)

        // return unlayer.removeEventListener('design:updated', designUpdates)
    }

    useEffect(onLoad, [])

    return <div id="editor-container" style={{height: '100vh', width: 'inherit'}}></div>
}

const unlayerConfigObject = PropTypes.shape({
  displayMode : PropTypes.oneOf(['web', 'email']).isRequired,
  mergeTags   : PropTypes.bool,
  form        : PropTypes.bool,
  design      : PropTypes.object
})

Unlayer.propTypes = {
  unlayerConfig : unlayerConfigObject.isRequired
}

export default Unlayer
